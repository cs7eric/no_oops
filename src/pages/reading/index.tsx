import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { books, notes, thoughts, Book, Note, Thought } from "@/data/reading";

export default function ReadingPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"books" | "notes" | "thoughts">("books");

  // Render star ratings
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">{t('reading.title')}</h1>
          <p className="text-default-600 max-w-2xl mx-auto">
            {t('reading.description') || "Books I'm reading, notes I've taken, and thoughts I've had."}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-content2 rounded-xl">
            <button
              className={`px-6 py-2 rounded-xl transition-all ${
                activeTab === "books"
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-content3"
              }`}
              onClick={() => setActiveTab("books")}
            >
              Books
            </button>
            <button
              className={`px-6 py-2 rounded-xl transition-all ${
                activeTab === "notes"
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-content3"
              }`}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </button>
            <button
              className={`px-6 py-2 rounded-xl transition-all ${
                activeTab === "thoughts"
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-content3"
              }`}
              onClick={() => setActiveTab("thoughts")}
            >
              Thoughts
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="mt-8">
          {activeTab === "books" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">My Reading List</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    className="bg-content1 rounded-2xl border border-default-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      {book.coverImage ? (
                        <img
                          alt={book.title}
                          className="w-16 h-24 object-cover rounded-md"
                          src={book.coverImage}
                        />
                      ) : (
                        <div className="w-16 h-24 bg-default-100 rounded-md flex items-center justify-center">
                          <span className="text-default-400 text-xs text-center">No Cover</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                        <p className="text-default-600 text-sm mb-2">by {book.author}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            book.status === "reading" 
                              ? "bg-blue-100 text-blue-800" 
                              : book.status === "completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-purple-100 text-purple-800"
                          }`}>
                            {book.status === "reading" 
                              ? "Reading" 
                              : book.status === "completed" 
                                ? "Completed" 
                                : "Want to Read"}
                          </span>
                          {book.rating && renderRating(book.rating)}
                        </div>
                        {book.startDate && (
                          <p className="text-default-500 text-xs">
                            {book.endDate 
                              ? `${book.startDate} - ${book.endDate}` 
                              : `Started: ${book.startDate}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "notes" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Notes & Highlights</h2>
              <div className="space-y-6">
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    className="bg-content1 rounded-2xl border border-default-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{note.title}</h3>
                      <span className="text-default-500 text-sm">{note.date}</span>
                    </div>
                    <p className="text-default-700 mb-4">{note.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "thoughts" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Thoughts & Reflections</h2>
              <div className="space-y-6">
                {thoughts.map((thought, index) => (
                  <motion.div
                    key={thought.id}
                    className="bg-content1 rounded-2xl border border-default-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{thought.title}</h3>
                      <span className="text-default-500 text-sm">{thought.date}</span>
                    </div>
                    <p className="text-default-700 mb-4">{thought.content}</p>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {thought.category}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}