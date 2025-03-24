import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set, get) => ({
	user: null,

	setUser: (user) => set({ user }),
	logOut: async () => {
		try {
			await axios.post('/api/auth/logout');
			set({ user: null });
		} catch (error) {
			console.error('Error logging out:', error.message);
			throw new Error('Cannot log out.');
		}
	},
}));

export default useAuthStore;
