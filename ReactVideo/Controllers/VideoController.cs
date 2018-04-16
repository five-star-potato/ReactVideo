using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;

namespace ReactImage.Controllers
{
    [Route("VideoLoader")]
    public class VideoController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public VideoController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index(string filename, string accessKey)
        {
            System.Console.WriteLine(HttpContext.Request.Headers["Range"]);
            var path = Path.Combine(_hostingEnvironment.ContentRootPath, @"media\" + filename);
            return File(System.IO.File.OpenRead(path), "video/mp4", true); 
        }
    }
}
