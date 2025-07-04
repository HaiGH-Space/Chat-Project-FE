import {create} from 'zustand';
import {Room} from "@/lib/interface/response/room";
import {getMyRooms} from "@/lib/api/room";
import {Page} from "@/lib/type";

interface RoomState {
    rooms: Room[];
    page: Page;
    roomSelected?: Room;
    isLoading: boolean;
    error?: string;
    setRooms: (rooms: Room[]) => void;
    fetchRooms: (page?: number, pageSize?: number) => Promise<void>;
    setRoomSelected: (room?: Room) => void;
    setPage: (page: Page) => void;
    setPageNumber: (pageNumber: number) => void;
}
const initialPage: Page = {
    number: 0,
    size: 9,
    totalElements: 0,
    totalPages: 0
}
export const useMyRoomStore = create<RoomState>(((set, get) => ({
    rooms: [],
    page: initialPage,
    pageSize: 10,
    total: 0,
    isLoading: false,
    setRooms: (rooms) => set({ rooms }),
    fetchRooms: async (page = get().page.number, pageSize = get().page.size) => {
        set({isLoading: true, error: undefined});
        const response = await getMyRooms(page,pageSize);
        if (response.success) {
            set({
                isLoading: false,
                rooms: response.data.content
            })
        } else {
            set({isLoading: false, error: response.message});
        }
    },
    setRoomSelected: (room?) => set({ roomSelected: room }),
    setPage: (page) => set({ page }),
    setPageNumber: (pageNumber) => set({page: {...get().page, number: pageNumber}})
})))