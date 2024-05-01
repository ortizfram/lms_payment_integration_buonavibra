return (
  formData && (
    <div className="courseCreate-page-cont min-w-[100vw]">
      <div className="max-w-[80vw] px-3 mt-[5vh] mx-auto">
        {errorMessage && (
          <p className="text-red-500 text-center text-2xl font-semibold">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center text-2xl font-semibold">
            {successMessage}
          </p>
        )}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CONTENT */}
            <h3>Titulo & contenido:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  titulo:
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripcion:
                </label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  type="text"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="text_content"
                className="block text-sm font-medium text-gray-700"
              >
                contenido texto:
              </label>
              <textarea
                name="text_content"
                value={formData.text_content}
                onChange={handleChange}
                type="text"
                className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <hr />

            {/* UPLOAD */}
            <h3>Subir Archivos:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-gray-700"
                >
                  subir video :
                </label>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleChange}
                  className="text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  subir miniatura:
                </label>
                <input
                  type="file"
                  id="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-black"
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="preview">
                <img
                  id="img"
                  ref={$image}
                  className="mt-4"
                  style={{ width: 300 }}
                />
              </div>
            </div>

            <input type="hidden" name="author_id" value={currentUser._id} />
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 mb-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Update Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
);
