export type UserRole = 'requestor' | 'caretaker' | 'admin'
export type PlanStatus = 'pending' | 'active' | 'paused' | 'cancelled'
export type VisitStatus = 'scheduled' | 'in_progress' | 'completed' | 'missed'
export type RideStatus = 'requested' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
export type UploadType = 'photo' | 'receipt' | 'document' | 'health_report'

export interface Profile {
  id: string
  role: UserRole
  full_name: string
  phone: string
  email: string
  created_at: string
}

export interface ParentProfile {
  id: string
  requestor_id: string
  name: string
  age: number
  address: string
  city: string
  state: string
  photo_url?: string
  health_notes?: string
  primary_physician?: string
  physician_phone?: string
  insurance_provider?: string
  insurance_policy_number?: string
  emergency_contact_name: string
  emergency_contact_phone: string
  created_at: string
}

export interface ServicePlan {
  id: string
  requestor_id: string
  caretaker_id?: string
  parent_id: string
  status: PlanStatus
  services: string[]
  monthly_cost: number
  start_date?: string
  notes?: string
  created_at: string
}

export interface Visit {
  id: string
  plan_id: string
  caretaker_id: string
  parent_id: string
  scheduled_at: string
  checked_in_at?: string
  checked_out_at?: string
  notes?: string
  status: VisitStatus
}

export interface VisitTask {
  id: string
  visit_id: string
  task_name: string
  completed: boolean
  completed_at?: string
}

export interface VisitUpload {
  id: string
  visit_id: string
  file_url: string
  file_type: UploadType
  uploaded_at: string
  notes?: string
}

export interface RideRequest {
  id: string
  parent_id: string
  requestor_id: string
  caretaker_id?: string
  origin_address: string
  destination_address: string
  scheduled_at: string
  status: RideStatus
  notes?: string
  created_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  monthly_cost: number
  category: string
  icon: string
}

export const SERVICES: Service[] = [
  { id: 'nurse_visit', name: 'Weekly Nurse Visit', description: 'Professional nurse visit every week', monthly_cost: 1500, category: 'Health', icon: '🏥' },
  { id: 'medicine', name: 'Medicine Support', description: 'Medicine reminders and tracking', monthly_cost: 500, category: 'Health', icon: '💊' },
  { id: 'doctor_booking', name: 'Doctor Appointment Booking', description: 'Book and accompany to doctor visits', monthly_cost: 1000, category: 'Health', icon: '🩺' },
  { id: 'hospital_escort', name: 'Hospital Escort', description: 'Accompany patient to hospital with full updates', monthly_cost: 2000, category: 'Health', icon: '🚑' },
  { id: 'companion', name: 'Companion Visits', description: '2–3 hour companionship and emotional support', monthly_cost: 2000, category: 'Lifestyle', icon: '🤝' },
  { id: 'grocery', name: 'Grocery Delivery', description: 'Regular grocery shopping and delivery', monthly_cost: 800, category: 'Daily Living', icon: '🛒' },
  { id: 'utility_bills', name: 'Utility Bill Payments', description: 'Handle electricity, water, gas bills', monthly_cost: 300, category: 'Daily Living', icon: '📋' },
  { id: 'cleaning', name: 'Home Cleaning', description: 'Weekly home cleaning service', monthly_cost: 1200, category: 'Home', icon: '🧹' },
  { id: 'emergency', name: 'Emergency Response', description: '24/7 emergency monitoring and response', monthly_cost: 1000, category: 'Safety', icon: '🆘' },
  { id: 'property', name: 'Property Management', description: 'Monthly property inspection and maintenance', monthly_cost: 3000, category: 'Property', icon: '🏠' },
  { id: 'festival', name: 'Festival Care', description: 'Home decoration and celebration support', monthly_cost: 1500, category: 'Lifestyle', icon: '🎉' },
  { id: 'smartphone', name: 'Smartphone Assistance', description: 'Help with phone, video calls with family', monthly_cost: 500, category: 'Tech', icon: '📱' },
]
