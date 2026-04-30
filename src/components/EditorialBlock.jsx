import React from 'react'

function EditorialBlock() {
  return (
    <div className="grid md:grid-cols-2 gap-10 p-12 items-center">
                <img
                src="https://images.unsplash.com/photo-1582582494700-86f7f0c3d8b5"
                className="w-full h-[300px] object-cover"
                />

                <div>
                <h3 className="text-xl font-semibold">Nyeste fra kollektionen</h3>
                <p className="mt-2 text-gray-600">
                    Farverige lysestager og unikke former inspireret af sæsonens stemning.
                </p>
                <button className="mt-4 px-4 py-2 border">
                    Se kollektion
                </button>
                </div>
            </div>
  )
}

export default EditorialBlock