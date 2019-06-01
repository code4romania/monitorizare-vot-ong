using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;

namespace MonitorizareVot.Ong.Api.Services
{
    public class NoCacheService : ICacheService
    {
        public async Task<T> GetOrSaveDataInCacheAsync<T>(string key, Func<Task<T>> source,
            DistributedCacheEntryOptions options = null)
        {
            return await source();
        }

        public Task<T> GetObjectSafeAsync<T>(string key) => throw new NotImplementedException();

        public Task SaveObjectSafeAsync(string key, object value,
            DistributedCacheEntryOptions options = null) => throw new NotImplementedException();
    }
}
