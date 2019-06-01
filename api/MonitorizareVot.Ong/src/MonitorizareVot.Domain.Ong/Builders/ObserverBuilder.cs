using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Domain.Ong.Builders
{
    public interface IBuilder<T>
    {
        T build(int IdNgo);
    }

    public interface IObserverBuilder : IBuilder<Observer>
    {
        void SetFromTeam(bool fromTeam);
        void SetIdNgo(int idNgo);
        void SetName(string Name);
        void SetPhone(string phone);
        void SetPin(string pin);
        void SetMobileDeviceId(string mobileDeviceId);
        void SetDeviceRegisterDate(DateTime? dateTime);
    }

    public class RandomObserverBuilder : IObserverBuilder
    {
        Observer _observer;

        public RandomObserverBuilder()
        {
            _observer = new Observer();
        }

        public Observer build(int IdNgo)
        {
            this.SetFromTeam(false);
            this.SetIdNgo(IdNgo);
            this.SetPhone(RandomNumberGenerator.GenerateWithPadding(10, "07"));
            this.SetPin(RandomNumberGenerator.Generate(6));
            this.SetMobileDeviceId(null);
            this.SetDeviceRegisterDate(null);
            this.SetName(String.Empty);

            return _observer;
        }

        public void SetDeviceRegisterDate(DateTime? dateTime)
        {
            _observer.DeviceRegisterDate = dateTime;
        }

        public void SetFromTeam(bool fromTeam)
        {
            _observer.FromTeam = fromTeam;
        }

        public void SetIdNgo(int idNgo)
        {
            _observer.IdNgo = idNgo;
        }

        public void SetMobileDeviceId(string mobileDeviceId)
        {
            _observer.MobileDeviceId = mobileDeviceId;
        }

        public void SetPhone(string phone)
        {
            _observer.Phone = phone;
        }

        public void SetPin(string pin)
        {
            _observer.Pin = pin;
        }

        public void SetName(string Name)
        {
            _observer.Name = Name;
        }
    }

    public class RandomNumberGenerator
    {
        public static string Generate(int digits)
        {
            Random random = new Random();
            string number = "";
            for(int i = 1; i < digits + 1; i++)
            {
                number += random.Next(0, 9).ToString();
            }
            return number;
        }

        public static string GenerateWithPadding(int digits, string prefix)
        {
            Random random = new Random();
            string number = prefix;
            for(int i = 1 + prefix.Length; i < digits + 1; i++)
            {
                number += random.Next(0, 9).ToString();
            }
            return number;
        }
    }
}
