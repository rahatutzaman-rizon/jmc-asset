"use client"

import { useState } from "react";
import Image from "next/image";

const initialProperties = [
  {
    id: 1,
    image: "https://i.ibb.co/2Yxwp37/Rectangle-16.png",
    price: "120,000,00 ৳",
    beds: 4,
    baths: 4,
    area: 3500,
    location: "Assure MN Tower, Aftabnagar, Dhaka",
  },
  {
    id: 2,
    image: "https://i.ibb.co/2Yxwp37/Rectangle-16.png",
    price: "120,000,00 ৳",
    beds: 4,
    baths: 4,
    area: 3500,
    location: "Assure MN Tower, Aftabnagar, Dhaka",
  },
  // Add more initial properties if needed
];

export default function Home() {
  const [properties, setProperties] = useState(initialProperties);
  const [editingProperty, setEditingProperty] = useState(null);
  const [newProperty, setNewProperty] = useState({
    image: "",
    price: "",
    beds: "",
    baths: "",
    area: "",
    location: "",
  });

  const addProperty = () => {
    const newId = properties.length ? properties[properties.length - 1].id + 1 : 1;
    setProperties([...properties, { ...newProperty, id: newId }]);
    setNewProperty({ image: "", price: "", beds: "", baths: "", area: "", location: "" });
  };

  const updateProperty = () => {
    setProperties(properties.map(p => (p.id === editingProperty.id ? editingProperty : p)));
    setEditingProperty(null);
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Management</h1>

      {/* Form for adding new or editing a property */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{editingProperty ? "Edit Property" : "Add New Property"}</h2>
        <form className="space-y-2">
          <input
            type="text"
            placeholder="Image URL"
            value={editingProperty ? editingProperty.image : newProperty.image}
            onChange={(e) =>
              editingProperty
                ? setEditingProperty({ ...editingProperty, image: e.target.value })
                : setNewProperty({ ...newProperty, image: e.target.value })
            }
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Price"
            value={editingProperty ? editingProperty.price : newProperty.price}
            onChange={(e) =>
              editingProperty
                ? setEditingProperty({ ...editingProperty, price: e.target.value })
                : setNewProperty({ ...newProperty, price: e.target.value })
            }
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Beds"
            value={editingProperty ? editingProperty.beds : newProperty.beds}
            onChange={(e) =>
              editingProperty
                ? setEditingProperty({ ...editingProperty, beds: parseInt(e.target.value) })
                : setNewProperty({ ...newProperty, beds: parseInt(e.target.value) })
            }
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Baths"
            value={editingProperty ? editingProperty.baths : newProperty.baths}
            onChange={(e) =>
              editingProperty
                ? setEditingProperty({ ...editingProperty, baths: parseInt(e.target.value) })
                : setNewProperty({ ...newProperty, baths: parseInt(e.target.value) })
            }
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Area (sq ft)"
            value={editingProperty ? editingProperty.area : newProperty.area}
            onChange={(e) =>
              editingProperty
                ? setEditingProperty({ ...editingProperty, area: parseInt(e.target.value) })
                : setNewProperty({ ...newProperty, area: parseInt(e.target.value) })
            }
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Location"
            value={editingProperty ? editingProperty.location : newProperty.location}
            onChange={(e) =>
              editingProperty
                ? setEditingProperty({ ...editingProperty, location: e.target.value })
                : setNewProperty({ ...newProperty, location: e.target.value })
            }
            className="border p-2 w-full"
          />
        </form>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4"
          onClick={editingProperty ? updateProperty : addProperty}
        >
          {editingProperty ? "Update Property" : "Add Property"}
        </button>
      </div>

      {/* Property List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 shadow-lg">
            <Image src={property.image} alt="Property" width={400} height={250} className="mb-4" />
            <h3 className="text-lg font-semibold mb-2">{property.location}</h3>
            <p>Price: {property.price}</p>
            <p>Beds: {property.beds}</p>
            <p>Baths: {property.baths}</p>
            <p>Area: {property.area} sq ft</p>
            <div className="mt-4">
              <button
                className="bg-yellow-500 text-white px-4 py-1 mr-2"
                onClick={() => setEditingProperty(property)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-1"
                onClick={() => deleteProperty(property.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
