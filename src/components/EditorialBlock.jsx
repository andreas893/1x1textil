import React from 'react'

function EditorialBlock() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 py-6 md:p-12 items-center text-(--color-text)">
                <img
                src="/images/lysestager-img.jpeg"
                className="w-full aspect-4/3 md:aspect-3/4 object-cover rounded-[5px]"
                />

                <div>
                <h3 className="h3 font-semibold">Nyeste fra 1+1 Design</h3>
                <p className="mt-2 body max-w-lg">
                    Fluorescerende lys fra 1+1 Design, hvor det klassiske stearinlys er gentænkt som et vævet tekstil.</p>
                <button className="w-fit py-2 mt-2 px-4 body-lg rounded-[10px] bg-surface">
                    Se kollektionen
                </button>
                </div>
            </div>
  )
}

export default EditorialBlock