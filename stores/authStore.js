import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set, get) => ({
	isLoading: false,
	user: null,

	logOut: async () => {
		try {
			await axios.post('/api/auth/logout');
			set({ user: null });
		} catch (error) {
			console.error('Error logging out:', error.message);
			throw new Error('Cannot log out.');
		}
	},
	logIn: async () => {},
}));

export default useAuthStore;
