"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  Calendar, 
  Image, 
  MapPin, 
  Link,
  Save,
  X
} from "lucide-react";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("events");
  const [isLoading, setIsLoading] = useState(false);

  // Events state (Our Initiatives)
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    venue: "",
    image: "",
    formLink: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState([]);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: "",
    category: "",
    src: "",
    driveLink: "",
  });
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [showGalleryForm, setShowGalleryForm] = useState(false);

  // Hardcoded credentials
  const ADMIN_EMAIL = "apekshafoundation@gmail.com";
  const ADMIN_PASS = "apeksha@none23";

  // Check for existing login on component mount
  useEffect(() => {
    const savedLogin = localStorage.getItem("adminLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
      fetchEvents();
      fetchGalleryItems();
    }
  }, []);

  // Events functions (Our Initiatives)
  async function fetchEvents() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Fetch events error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addEvent(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newEvent,
          price: parseFloat(newEvent.price) || 0,
          date: new Date(newEvent.date),
        }),
      });
      
      if (res.ok) {
        setNewEvent({ title: "", description: "", price: "", date: "", venue: "", image: "", formLink: "" });
        setShowEventForm(false);
        fetchEvents();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to add event'}`);
      }
    } catch (err) {
      console.error("Add event error:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateEvent(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`/api/events/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingEvent,
          price: parseFloat(editingEvent.price) || 0,
          date: new Date(editingEvent.date),
        }),
      });
      
      if (res.ok) {
        setEditingEvent(null);
        setShowEventForm(false);
        fetchEvents();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to update event'}`);
      }
    } catch (err) {
      console.error("Update event error:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteEvent(id) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchEvents();
      }
    } catch (err) {
      console.error("Delete event error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function startEditEvent(event) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate instanceof Date && !isNaN(eventDate) 
      ? eventDate.toISOString().slice(0, 16)
      : "";
    setEditingEvent({ ...event, date: formattedDate });
    setShowEventForm(true);
  }

  function cancelEditEvent() {
    setEditingEvent(null);
    setShowEventForm(false);
    setNewEvent({ title: "", description: "", price: "", date: "", venue: "", image: "", formLink: "" });
  }

  // Gallery functions
  async function fetchGalleryItems() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryItems(data);
    } catch (err) {
      console.error("Fetch gallery error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addGalleryItem(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGalleryItem),
      });
      
      if (res.ok) {
        setNewGalleryItem({ title: "", category: "", src: "", driveLink: "" });
        setShowGalleryForm(false);
        fetchGalleryItems();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to add gallery item'}`);
      }
    } catch (err) {
      console.error("Add gallery item error:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateGalleryItem(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`/api/gallery/${editingGalleryItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGalleryItem),
      });
      
      if (res.ok) {
        setEditingGalleryItem(null);
        setShowGalleryForm(false);
        fetchGalleryItems();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to update gallery item'}`);
      }
    } catch (err) {
      console.error("Update gallery item error:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteGalleryItem(id) {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchGalleryItems();
      }
    } catch (err) {
      console.error("Delete gallery item error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function startEditGalleryItem(item) {
    setEditingGalleryItem({ ...item });
    setShowGalleryForm(true);
  }

  function cancelEditGalleryItem() {
    setEditingGalleryItem(null);
    setShowGalleryForm(false);
    setNewGalleryItem({ title: "", category: "", src: "", driveLink: "" });
  }

  function handleLogin(e) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      fetchEvents();
      fetchGalleryItems();
    } else {
      alert("Invalid credentials!");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    setEmail("");
    setPassword("");
  }

  // ------------------- Render -------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
              <p className="text-gray-400">Sign in to manage content</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                  required
          />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
                  required
          />
              </div>
              
              <motion.button
            type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
                Sign In
              </motion.button>
        </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/30 backdrop-blur-lg border-b border-gray-700/50 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage your content</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg border border-red-600/30 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </motion.div>

      <div className="p-6">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-2 mb-8 bg-gray-800/30 backdrop-blur-lg rounded-xl p-2 border border-gray-700/50 w-fit"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "events"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <Calendar size={18} />
            Events
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "gallery"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <Image size={18} />
            Gallery
          </motion.button>
        </motion.div>

        {/* Events Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Add/Edit Event Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Events Management</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEventForm(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg"
                >
                  <Plus size={18} />
                  Add Event
                </motion.button>
              </div>

              {/* Event Form Modal */}
              <AnimatePresence>
                {showEventForm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={(e) => e.target === e.currentTarget && cancelEditEvent()}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-gray-700/50"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">
                          {editingEvent ? "Edit Event" : "Add New Event"}
                        </h3>
                        <button
                          onClick={cancelEditEvent}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      <form onSubmit={editingEvent ? updateEvent : addEvent} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
        <input
          type="text"
                              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              value={editingEvent ? editingEvent.title : newEvent.title}
                              onChange={(e) => editingEvent 
                                ? setEditingEvent({...editingEvent, title: e.target.value})
                                : setNewEvent({...newEvent, title: e.target.value})
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Venue</label>
        <input
          type="text"
                              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              value={editingEvent ? editingEvent.venue : newEvent.venue}
                              onChange={(e) => editingEvent 
                                ? setEditingEvent({...editingEvent, venue: e.target.value})
                                : setNewEvent({...newEvent, venue: e.target.value})
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                          <textarea
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            value={editingEvent ? editingEvent.description : newEvent.description}
                            onChange={(e) => editingEvent 
                              ? setEditingEvent({...editingEvent, description: e.target.value})
                              : setNewEvent({...newEvent, description: e.target.value})
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹)</label>
                            <input
                              type="number"
                              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              value={editingEvent ? editingEvent.price : newEvent.price}
                              onChange={(e) => editingEvent 
                                ? setEditingEvent({...editingEvent, price: e.target.value})
                                : setNewEvent({...newEvent, price: e.target.value})
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
        <input
                              type="datetime-local"
                              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              value={editingEvent ? editingEvent.date : newEvent.date}
                              onChange={(e) => editingEvent 
                                ? setEditingEvent({...editingEvent, date: e.target.value})
                                : setNewEvent({...newEvent, date: e.target.value})
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
        <input
                              type="url"
                              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              value={editingEvent ? editingEvent.image : newEvent.image}
                              onChange={(e) => editingEvent 
                                ? setEditingEvent({...editingEvent, image: e.target.value})
                                : setNewEvent({...newEvent, image: e.target.value})
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Form Link (Google Form URL)</label>
                          <input
                            type="url"
                            placeholder="https://forms.gle/..."
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            value={editingEvent ? editingEvent.formLink : newEvent.formLink}
                            onChange={(e) => editingEvent 
                              ? setEditingEvent({...editingEvent, formLink: e.target.value})
                              : setNewEvent({...newEvent, formLink: e.target.value})
                            }
                          />
                          <p className="text-xs text-gray-500 mt-1">Optional: Add a Google Form link for event registration</p>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <motion.button
          type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            {isLoading ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <Save size={18} />
                                {editingEvent ? "Update Event" : "Add Event"}
                              </>
                            )}
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={cancelEditEvent}
                            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200"
                          >
                            Cancel
                          </motion.button>
                        </div>
      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Events List */}
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="p-6 border-b border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white">All Events ({events.length})</h3>
                </div>
                <div className="divide-y divide-gray-700/50">
                  {isLoading ? (
                    <div className="p-8 text-center">
                      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-400">Loading events...</p>
                    </div>
                  ) : events.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No events found. Add your first event!</p>
                    </div>
                  ) : (
                    events.map((event, index) => (
                      <motion.div
            key={event._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 hover:bg-gray-700/30 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full">
                                ₹{event.price}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2 line-clamp-2">{event.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                {event.venue}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {event.date ? new Date(event.date).toLocaleDateString() : 'No date set'}
                              </div>
                              {event.formLink && (
                                <div className="flex items-center gap-1 text-blue-400">
                                  <Link size={14} />
                                  Has Form Link
                                </div>
                              )}
                            </div>
            </div>
                          <div className="flex items-center gap-2 ml-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => startEditEvent(event)}
                              className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all duration-200"
                            >
                              <Edit3 size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
              onClick={() => deleteEvent(event._id)}
                              className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all duration-200"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Add/Edit Gallery Item Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Gallery Management</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGalleryForm(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg"
                >
                  <Plus size={18} />
                  Add Gallery Item
                </motion.button>
              </div>

              {/* Gallery Form Modal */}
              <AnimatePresence>
                {showGalleryForm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={(e) => e.target === e.currentTarget && cancelEditGalleryItem()}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-gray-700/50"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">
                          {editingGalleryItem ? "Edit Gallery Item" : "Add New Gallery Item"}
                        </h3>
                        <button
                          onClick={cancelEditGalleryItem}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <X size={24} />
            </button>
          </div>

                      <form onSubmit={editingGalleryItem ? updateGalleryItem : addGalleryItem} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              value={editingGalleryItem ? editingGalleryItem.title : newGalleryItem.title}
                              onChange={(e) => editingGalleryItem 
                                ? setEditingGalleryItem({...editingGalleryItem, title: e.target.value})
                                : setNewGalleryItem({...newGalleryItem, title: e.target.value})
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              value={editingGalleryItem ? editingGalleryItem.category : newGalleryItem.category}
                              onChange={(e) => editingGalleryItem 
                                ? setEditingGalleryItem({...editingGalleryItem, category: e.target.value})
                                : setNewGalleryItem({...newGalleryItem, category: e.target.value})
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                          <input
                            type="url"
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            value={editingGalleryItem ? editingGalleryItem.src : newGalleryItem.src}
                            onChange={(e) => editingGalleryItem 
                              ? setEditingGalleryItem({...editingGalleryItem, src: e.target.value})
                              : setNewGalleryItem({...newGalleryItem, src: e.target.value})
                            }
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Drive Link</label>
                          <input
                            type="url"
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            value={editingGalleryItem ? editingGalleryItem.driveLink : newGalleryItem.driveLink}
                            onChange={(e) => editingGalleryItem 
                              ? setEditingGalleryItem({...editingGalleryItem, driveLink: e.target.value})
                              : setNewGalleryItem({...newGalleryItem, driveLink: e.target.value})
                            }
                            required
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            {isLoading ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <Save size={18} />
                                {editingGalleryItem ? "Update Item" : "Add Item"}
                              </>
                            )}
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={cancelEditGalleryItem}
                            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gallery Items List */}
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="p-6 border-b border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white">All Gallery Items ({galleryItems.length})</h3>
                </div>
                <div className="divide-y divide-gray-700/50">
                  {isLoading ? (
                    <div className="p-8 text-center">
                      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-400">Loading gallery items...</p>
                    </div>
                  ) : galleryItems.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      <Image size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No gallery items found. Add your first item!</p>
                    </div>
                  ) : (
                    galleryItems.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 hover:bg-gray-700/30 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                              <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm rounded-full">
                                {item.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Image size={14} />
                                Image URL
                              </div>
                              <div className="flex items-center gap-1">
                                <Link size={14} />
                                Drive Link
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => startEditGalleryItem(item)}
                              className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all duration-200"
                            >
                              <Edit3 size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteGalleryItem(item._id)}
                              className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all duration-200"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
