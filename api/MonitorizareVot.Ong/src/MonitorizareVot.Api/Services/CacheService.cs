using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace MonitorizareVot.Ong.Api.Services
{
    public class CacheService : ICacheService
    {
        private readonly IDistributedCache _cache;
        private readonly ILogger _logger;

        public CacheService(IDistributedCache cache, ILogger logger)
        {
            _cache = cache;
            _logger = logger;
        }

        public async Task<T> GetOrSaveDataInCacheAsync<T>(string key, Func<Task<T>> source, DistributedCacheEntryOptions options = null)
        {
            var obj = await GetObjectSafeAsync<T>(key);

            if (obj != null)
                return obj;

            var result = await source();

            await SaveObjectSafeAsync(key, result, options);

            return result;
        }

        public async Task<T> GetObjectSafeAsync<T>(string key)
        {
            var result = default(T);

            try
            {
                var cache = await _cache.GetAsync(key);

                if (cache == null)
                    return default(T);

                var obj = JsonConvert.DeserializeObject<T>(GetString(cache));

                return obj;

            }
            catch (Exception exception)
            {
                _logger.LogError(GetHashCode(),exception,exception.Message);
            }

            return result;
        }

        public async Task SaveObjectSafeAsync(string key, object value, DistributedCacheEntryOptions options = null)
        {
            try
            {
                var obj = JsonConvert.SerializeObject(value);

                if (options != null)
                    await _cache.SetAsync(key, GetBytes(obj), options);
                else
                    await _cache.SetAsync(key, GetBytes(obj));

            }
            catch (Exception exception)
            {
                _logger.LogError(GetHashCode(), exception, exception.Message);
            }
        }

        private static byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }
        private static string GetString(byte[] bytes)
        {
            char[] chars = new char[bytes.Length / sizeof(char)];
            System.Buffer.BlockCopy(bytes, 0, chars, 0, bytes.Length);
            return new string(chars);
        }
    }
}
