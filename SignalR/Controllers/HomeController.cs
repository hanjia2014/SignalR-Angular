using SignalR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignalR.Controllers
{
    public class HomeController : Controller
    {
        private EventService _eventService;
        public HomeController()
        {
            _eventService = new EventService();
        }
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Calendar()
        {
            return View();
        }

        public JsonResult AddEvent(Event item)
        {
            var id = _eventService.AddEvent(item);
            return Json(id, JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public JsonResult DeleteEvent(int id)
        {
            if (_eventService.DeleteEvent(id))
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
	}
}