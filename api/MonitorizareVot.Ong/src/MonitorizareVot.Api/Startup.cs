using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.IdentityModel.Tokens;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Common;
using MonitorizareVot.Ong.Api.Models;
using MonitorizareVot.Ong.Api.Services;
using Serilog;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace MonitorizareVot.Ong.Api
{
    public class Startup
    {
        private readonly Container _container = new Container();
        private SymmetricSecurityKey _key;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);

            if (env.EnvironmentName.EndsWith("Development", StringComparison.CurrentCultureIgnoreCase))
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();

                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.Configure<HashOptions>(options => Configuration.GetSection("HashOptions").Bind(options));

            ConfigureJwt(services);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AppUser",
                                  policy => policy.RequireClaim("Organizatie", "Ngo"));
            });

            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);


            services.AddMvc(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            });
            services.AddSpaStaticFiles(config => config.RootPath = "wwwroot");

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Monitorizare Vot - API ONG",
                    Description = "API care ofera suport portalului folosit de ONG.",
                    TermsOfService = "TBD",
                    Contact =
                        new Contact
                        {
                            Email = "info@monitorizarevot.ro",
                            Name = "Code for Romania",
                            Url = "http://monitorizarevot.ro"
                        }
                });
                options.AddSecurityDefinition("bearer", new ApiKeyScheme() {
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                options.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>{
                    { "bearer", new[] {"readAccess", "writeAccess" } } });
                var path = PlatformServices.Default.Application.ApplicationBasePath +
                           Path.DirectorySeparatorChar + "MonitorizareVot.Ong.Api.xml";

                if (File.Exists(path))
                    options.IncludeXmlComments(path);
            });

            ConfigureContainer(services);
            ConfigureCache(services);
        }

        private void ConfigureJwt(IServiceCollection services)
        {
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            _key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["SecretKey"]));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,

                RequireExpirationTime = true,
                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };

            //var events = new JwtBearerEvents
            //{
            //    OnAuthenticationFailed = (context) =>
            //    {
            //        if (context.Exception is SecurityTokenExpiredException &&
            //            context.Request.Path.ToString().ToLower() == "/api/v1/auth" &&
            //            context.Request.Method.ToLower() == "put")
            //        {
            //            // skip authentification 
            //            context.SkipToNextMiddleware();
            //        }

            //        return Task.FromResult(0);
            //    },
            //    OnTokenValidated = (context) =>
            //    {
            //        if (context.Request.Path.ToString().ToLower() == "/api/v1/auth" &&
            //            context.Request.Method.ToLower() == "put")
            //        {
            //            context.HandleResponse();
            //            throw new SecurityTokenSignatureKeyNotFoundException();
            //        }

            //        return Task.FromResult(0);
            //    }
            //};

            //var jwtoptions = new JwtBearerOptions
            //{
            //    AutomaticAuthenticate = true,
            //    AutomaticChallenge = true,
            //    TokenValidationParameters = tokenValidationParameters,
            //    Events = events
            //});

            services.AddAuthentication(options => { options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = tokenValidationParameters;
                    //options.Events = events;
                    options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                    options.RequireHttpsMetadata = false;
                    options.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
            IApplicationLifetime appLifetime, IDistributedCache cache)
        {
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            loggerFactory.AddSerilog();
            Log.Logger = new LoggerConfiguration()
                .WriteTo
                .ApplicationInsightsTraces(Configuration["ApplicationInsights:InstrumentationKey"])
                .CreateLogger();

            appLifetime.ApplicationStopped.Register(Log.CloseAndFlush);

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 && !context.Request.Path.Value.StartsWith("/api") && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });


            app.UseExceptionHandler(
            builder =>
            {
                builder.Run(context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";
                    return Task.FromResult(0);
                }
                );
            });

            app.UseAuthentication();

            ConfigureHash(app);

            RegisterServices(app);

            InitializeContainer(app);

            RegisterDbContext<VoteMonitorContext>(Configuration.GetConnectionString("DefaultConnection"));

            RegisterAutomapper();

            BuildMediator();

            _container.Verify();

            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();

            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            app.UseSwaggerUI(o => o.SwaggerEndpoint("/swagger/v1/swagger.json", "MV API v1"));

            app.UseMvc();
            app.UseSpa(options => { options.Options.SourcePath = "../../frontend"; });
        }

        private void ConfigureCache(IServiceCollection services)
        {
            var enableCache = Configuration.GetValue<bool>("ApplicationCacheOptions:Enabled");

            if (!enableCache)
            {
                _container.RegisterInstance<ICacheService>(new NoCacheService());
                return;
            }

            var cacheProvider = Configuration.GetValue<string>("ApplicationCacheOptions:Implementation");

            _container.RegisterSingleton<ICacheService, CacheService>();

            switch (cacheProvider)
            {
                case "RedisCache":
                    {
                        services.AddDistributedRedisCache(options =>
                        {
                            Configuration.GetSection("RedisCacheOptions").Bind(options);
                        });

                        //_container.RegisterInstance<IDistributedCache>(
                        //  new RedisCache(
                        //      new OptionsManager<RedisCacheOptions>(new List<IConfigureOptions<RedisCacheOptions>>
                        //      {
                        //        new ConfigureFromConfigurationOptions<RedisCacheOptions>(
                        //            Configuration.GetSection("RedisCacheOptions"))
                        //       })
                        //  ));
                        break;
                    }

                default:
                case "MemoryDistributedCache":
                    {

                        services.AddDistributedMemoryCache();
                        // _container.RegisterInstance<IDistributedCache>(new MemoryDistributedCache(new MemoryCache(new MemoryCacheOptions())));
                        break;
                    }
            }
        }

        private void ConfigureHash(IApplicationBuilder app)
        {
            _container.RegisterSingleton(() => app.ApplicationServices.GetService<IOptions<HashOptions>>());
            _container.RegisterSingleton<IHashService, HashService>();
        }

        private void ConfigureContainer(IServiceCollection services)
        {
            services.UseSimpleInjectorAspNetRequestScoping(_container);

            _container.Options.DefaultScopedLifestyle = new SimpleInjector.Lifestyles.AsyncScopedLifestyle();// AspNetRequestLifestyle();

            services.AddSingleton<IControllerActivator>(
                new SimpleInjectorControllerActivator(_container));
            services.AddSingleton<IViewComponentActivator>(
                new SimpleInjectorViewComponentActivator(_container));
        }

        private void RegisterServices(IApplicationBuilder app)
        {
            //exemplu de servicii custom
            _container.Register(() => app.ApplicationServices.GetService<IOptions<JwtIssuerOptions>>(), Lifestyle.Transient);
            //container.Register<ISectieDeVotareService, SectieDevotareDBService>(Lifestyle.Scoped);
        }

        private void InitializeContainer(IApplicationBuilder app)
        {
            // Add application presentation components:
            _container.RegisterMvcControllers(app);
            _container.RegisterMvcViewComponents(app);

            // Add application services. For instance:
            //container.Register<IUserRepository, SqlUserRepository>(Lifestyle.Scoped);


            // Cross-wire ASP.NET services (if any). For instance:
            _container.RegisterInstance(app.ApplicationServices.GetService<ILoggerFactory>());
            _container.RegisterConditional(
                typeof(ILogger),
                c => typeof(Logger<>).MakeGenericType(c.Consumer.ImplementationType),
                Lifestyle.Singleton,
                c => true);

            _container.RegisterInstance<IConfigurationRoot>(Configuration);
        }

        private void RegisterDbContext<TDbContext>(string connectionString = null)
            where TDbContext : DbContext
        {
            if (!string.IsNullOrEmpty(connectionString))
            {
                var optionsBuilder = new DbContextOptionsBuilder<TDbContext>();
                optionsBuilder.UseSqlServer(connectionString);

                _container.RegisterInstance(optionsBuilder.Options);

                _container.Register<TDbContext>(Lifestyle.Scoped);
            }
            else
            {
                _container.Register<TDbContext>(Lifestyle.Scoped);
            }
        }

        private IMediator BuildMediator()
        {
            var assemblies = GetAssemblies().ToArray();
            _container.RegisterSingleton<IMediator, Mediator>();
            _container.Register(typeof(IRequestHandler<,>), assemblies);
            _container.Register(typeof(AsyncRequestHandler<,>), assemblies);
            _container.Collection.Register(typeof(INotificationHandler<>), assemblies);
            _container.Collection.Register(typeof(AsyncNotificationHandler<>), assemblies);
            _container.RegisterInstance(Console.Out);
            _container.RegisterInstance(new SingleInstanceFactory(_container.GetInstance));
            _container.RegisterInstance(new MultiInstanceFactory(_container.GetAllInstances));

            // had to add this registration as we were getting the same behavior as described here: https://github.com/jbogard/MediatR/issues/155
            _container.Collection.Register(typeof(IPipelineBehavior<,>), Enumerable.Empty<Type>());

            var mediator = _container.GetInstance<IMediator>();

            return mediator;
        }

        private void RegisterAutomapper()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfiles(GetAssemblies());
                cfg.CreateMissingTypeMaps = true;
            });

            _container.RegisterInstance(Mapper.Configuration);
            _container.Register<IMapper>(() => new Mapper(Mapper.Configuration), Lifestyle.Scoped);
        }

        private static IEnumerable<Assembly> GetAssemblies()
        {
            yield return typeof(IMediator).GetTypeInfo().Assembly;
            yield return typeof(Startup).GetTypeInfo().Assembly;
            yield return typeof(VoteMonitorContext).GetTypeInfo().Assembly;
        }
    }
}
