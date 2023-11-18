using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace $rootnamespace$
{
    public class $safeitemname$ : Controller
    {
        // GET: $safeitemname$
        public ActionResult Index()
        {
            return View();
        }

        // GET: $safeitemname$/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: $safeitemname$/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: $safeitemname$/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: $safeitemname$/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: $safeitemname$/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: $safeitemname$/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: $safeitemname$/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
