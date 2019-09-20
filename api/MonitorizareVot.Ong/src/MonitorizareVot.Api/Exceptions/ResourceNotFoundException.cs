using System;

namespace MonitorizareVot.Api.Exceptions
{
    public class ResourceNotFoundException : Exception
    {
        private readonly static string EX_MESSAGE = "Resource not found";
        public ResourceNotFoundException() : base(EX_MESSAGE) { }
        public ResourceNotFoundException(string Message) : base(Message) { }
        public ResourceNotFoundException(string Message, Exception Ex) : base(Message, Ex) { }
    }
}