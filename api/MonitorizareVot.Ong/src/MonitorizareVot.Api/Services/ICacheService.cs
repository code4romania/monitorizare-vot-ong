using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;

namespace MonitorizareVot.Ong.Api.Services
{
    public interface ICacheService
    {
        Task<T> GetOrSaveDataInCacheAsync<T>(string key, Func<Task<T>> source, DistributedCacheEntryOptions options = null);
        Task<T> GetObjectSafeAsync<T>(string key);
        Task SaveObjectSafeAsync(string key, object value, DistributedCacheEntryOptions options = null);
    }
}
