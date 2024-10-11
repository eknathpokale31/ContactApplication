using ContactsAPI.Models;
using ContactsAPI.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactRepository _repository;

        public ContactsController()
        {
            _repository = new ContactRepository();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Contact>> Get()
        {
            return Ok(_repository.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<Contact> Get(int id)
        {
            var contact = _repository.GetById(id);
            if (contact == null)
                return NotFound();
            return Ok(contact);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Contact contact)
        {
            if (contact == null)
                return BadRequest();

            _repository.Add(contact);
            return CreatedAtAction(nameof(Get), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Contact contact)
        {
            if (contact == null || contact.Id != id)
                return BadRequest();

            var existingContact = _repository.GetById(id);
            if (existingContact == null)
                return NotFound();

            _repository.Update(contact);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var existingContact = _repository.GetById(id);
            if (existingContact == null)
                return NotFound();

            _repository.Delete(id);
            return NoContent();
        }
    }
}
