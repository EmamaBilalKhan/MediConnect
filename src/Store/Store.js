import { create } from 'zustand'

export const useMediConnectStore = create((set) => ({
  selectedAppointmentMonth: "July 2024",  
  setSelectedAppointmentMonth:(Month)=> set({selectedAppointmentMonth: Month}),
}))

