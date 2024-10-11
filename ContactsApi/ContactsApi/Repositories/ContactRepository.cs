using ContactsAPI.Models;
using System.Xml;
using Newtonsoft.Json;

namespace ContactsAPI.Repositories
{
    public class ContactRepository
    {
        private readonly string _filePath = "contacts.json";

        public List<Contact> GetAll()
        {
            if (!File.Exists(_filePath))
                return new List<Contact>();

            var jsonData = File.ReadAllText(_filePath);
            return JsonConvert.DeserializeObject<List<Contact>>(jsonData) ?? new List<Contact>();
        }

        public Contact GetById(int id)
        {
            var contacts = GetAll();
            return contacts.FirstOrDefault(c => c.Id == id);
        }

        public void Add(Contact contact)
        {
            var contacts = GetAll();
            contact.Id = contacts.Count > 0 ? contacts.Max(c => c.Id) + 1 : 1;
            contacts.Add(contact);
            File.WriteAllText(_filePath, JsonConvert.SerializeObject(contacts, Newtonsoft.Json.Formatting.Indented));
        }

        public void Update(Contact contact)
        {
            var contacts = GetAll();
            var existingContact = contacts.FirstOrDefault(c => c.Id == contact.Id);
            if (existingContact != null)
            {
                existingContact.FirstName = contact.FirstName;
                existingContact.LastName = contact.LastName;
                existingContact.Email = contact.Email;
                File.WriteAllText(_filePath, JsonConvert.SerializeObject(contacts, Newtonsoft.Json.Formatting.Indented));
            }
        }

        public void Delete(int id)
        {
            var contacts = GetAll();
            var contactToRemove = contacts.FirstOrDefault(c => c.Id == id);
            if (contactToRemove != null)
            {
                contacts.Remove(contactToRemove);
                File.WriteAllText(_filePath, JsonConvert.SerializeObject(contacts, Newtonsoft.Json.Formatting.Indented));
            }
        }
    }
}
