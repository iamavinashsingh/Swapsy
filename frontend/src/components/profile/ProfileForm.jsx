import React, { useState, useEffect } from 'react';
import SkillsManager from './SkillsManager';
import AvailabilitySelector from './AvailabilitySelector';
import PrivacyToggle from './PrivacyToggle';
import { motion } from 'framer-motion';

const ProfileForm = ({ userData, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    profilePhoto: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: [],
    isPublic: true,
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // pass data to parent handler
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Your Profile 📝</h2>

      {/* Name */}
      <div>
        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Location (Optional)</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        />
      </div>

      {/* Profile Photo */}
      <div>
        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Profile Photo (Optional)</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        {formData.profilePhoto && (
          <img src={formData.profilePhoto} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full border" />
        )}
      </div>

      {/* Skills */}
      <SkillsManager
        label="Skills Offered"
        skills={formData.skillsOffered}
        onChange={(val) => setFormData({ ...formData, skillsOffered: val })}
      />

      <SkillsManager
        label="Skills Wanted"
        skills={formData.skillsWanted}
        onChange={(val) => setFormData({ ...formData, skillsWanted: val })}
      />

      {/* Availability */}
      <AvailabilitySelector
        value={formData.availability}
        onChange={(val) => setFormData({ ...formData, availability: val })}
      />

      {/* Privacy Toggle */}
      <PrivacyToggle
        value={formData.isPublic}
        onChange={(val) => setFormData({ ...formData, isPublic: val })}
      />

      {/* Submit */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition"
      >
        Save Profile
      </motion.button>
    </form>
  );
};

export default ProfileForm;
