export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      departments: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          capacity: number | null
          created_at: string
          department_id: string | null
          id: string
          is_available: boolean | null
          modality: Database["public"]["Enums"]["study_modality"] | null
          name: string
          notes: string | null
          room_number: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          department_id?: string | null
          id?: string
          is_available?: boolean | null
          modality?: Database["public"]["Enums"]["study_modality"] | null
          name: string
          notes?: string | null
          room_number?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          department_id?: string | null
          id?: string
          is_available?: boolean | null
          modality?: Database["public"]["Enums"]["study_modality"] | null
          name?: string
          notes?: string | null
          room_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      radiology_requests: {
        Row: {
          body_part: string | null
          clinical_indication: string | null
          completed_at: string | null
          contrast_required: boolean | null
          created_at: string
          id: string
          location: string | null
          modality: Database["public"]["Enums"]["study_modality"]
          notes: string | null
          patient_dob: string | null
          patient_gender: string | null
          patient_id: string
          patient_name: string
          preparation_instructions: string | null
          priority: Database["public"]["Enums"]["priority_level"]
          radiologist_assigned: string | null
          referring_physician: string
          requested_at: string
          room_number: string | null
          scheduled_at: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["request_status"]
          study_type: string
          technician_assigned: string | null
          updated_at: string
        }
        Insert: {
          body_part?: string | null
          clinical_indication?: string | null
          completed_at?: string | null
          contrast_required?: boolean | null
          created_at?: string
          id?: string
          location?: string | null
          modality: Database["public"]["Enums"]["study_modality"]
          notes?: string | null
          patient_dob?: string | null
          patient_gender?: string | null
          patient_id: string
          patient_name: string
          preparation_instructions?: string | null
          priority?: Database["public"]["Enums"]["priority_level"]
          radiologist_assigned?: string | null
          referring_physician: string
          requested_at?: string
          room_number?: string | null
          scheduled_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          study_type: string
          technician_assigned?: string | null
          updated_at?: string
        }
        Update: {
          body_part?: string | null
          clinical_indication?: string | null
          completed_at?: string | null
          contrast_required?: boolean | null
          created_at?: string
          id?: string
          location?: string | null
          modality?: Database["public"]["Enums"]["study_modality"]
          notes?: string | null
          patient_dob?: string | null
          patient_gender?: string | null
          patient_id?: string
          patient_name?: string
          preparation_instructions?: string | null
          priority?: Database["public"]["Enums"]["priority_level"]
          radiologist_assigned?: string | null
          referring_physician?: string
          requested_at?: string
          room_number?: string | null
          scheduled_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          study_type?: string
          technician_assigned?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      study_types: {
        Row: {
          body_part: string | null
          contrast_required: boolean | null
          created_at: string
          id: string
          is_active: boolean | null
          modality: Database["public"]["Enums"]["study_modality"]
          name: string
          preparation_instructions: string | null
          preparation_required: boolean | null
          typical_duration_minutes: number | null
        }
        Insert: {
          body_part?: string | null
          contrast_required?: boolean | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          modality: Database["public"]["Enums"]["study_modality"]
          name: string
          preparation_instructions?: string | null
          preparation_required?: boolean | null
          typical_duration_minutes?: number | null
        }
        Update: {
          body_part?: string | null
          contrast_required?: boolean | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          modality?: Database["public"]["Enums"]["study_modality"]
          name?: string
          preparation_instructions?: string | null
          preparation_required?: boolean | null
          typical_duration_minutes?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          department: string | null
          first_name: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          last_name: string | null
          license_number: string | null
          office_location: string | null
          pager: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          specialization: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string | null
          license_number?: string | null
          office_location?: string | null
          pager?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string | null
          license_number?: string | null
          office_location?: string | null
          pager?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      priority_level: "urgent" | "priority" | "routine"
      request_status: "pending" | "in_progress" | "completed" | "cancelled"
      study_modality:
        | "CT"
        | "MRI"
        | "X-Ray"
        | "Ultrasound"
        | "Nuclear Medicine"
        | "Mammography"
        | "Fluoroscopy"
      user_role:
        | "admin"
        | "radiologist"
        | "technician"
        | "referring_physician"
        | "scheduler"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      priority_level: ["urgent", "priority", "routine"],
      request_status: ["pending", "in_progress", "completed", "cancelled"],
      study_modality: [
        "CT",
        "MRI",
        "X-Ray",
        "Ultrasound",
        "Nuclear Medicine",
        "Mammography",
        "Fluoroscopy",
      ],
      user_role: [
        "admin",
        "radiologist",
        "technician",
        "referring_physician",
        "scheduler",
      ],
    },
  },
} as const

// Convenience types
export type RadiologyRequest = Tables<'radiology_requests'>
export type RadiologyRequestInsert = TablesInsert<'radiology_requests'>
export type RadiologyRequestUpdate = TablesUpdate<'radiology_requests'>

export type PriorityLevel = Enums<'priority_level'>
export type RequestStatus = Enums<'request_status'>
export type StudyModality = Enums<'study_modality'>
export type UserRole = Enums<'user_role'>