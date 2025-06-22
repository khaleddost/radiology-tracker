import type { RadiologyRequest, PriorityLevel, RequestStatus } from '~/types/database'

export const useRadiologyRequests = () => {
  const supabase = useSupabaseClient()

  // Fetch all radiology requests with real-time updates
  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('radiology_requests')
      .select('*')
      .order('requested_at', { ascending: false })

    if (error) {
      console.error('Error fetching radiology requests:', error)
      throw error
    }

    return data as RadiologyRequest[]
  }

  // Fetch requests with filtering
  const fetchRequestsFiltered = async (filters: {
    status?: RequestStatus[]
    priority?: PriorityLevel[]
    modality?: string[]
  } = {}) => {
    let query = supabase
      .from('radiology_requests')
      .select('*')

    if (filters.status?.length) {
      query = query.in('status', filters.status)
    }

    if (filters.priority?.length) {
      query = query.in('priority', filters.priority)
    }

    if (filters.modality?.length) {
      query = query.in('modality', filters.modality)
    }

    query = query.order('requested_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching filtered radiology requests:', error)
      throw error
    }

    return data as RadiologyRequest[]
  }

  // Get requests summary/statistics
  const getRequestsSummary = async () => {
    const { data, error } = await supabase
      .from('radiology_requests')
      .select('status, priority')

    if (error) {
      console.error('Error fetching requests summary:', error)
      throw error
    }

    const summary = {
      total: data.length,
      pending: data.filter(r => r.status === 'pending').length,
      in_progress: data.filter(r => r.status === 'in_progress').length,
      completed: data.filter(r => r.status === 'completed').length,
      urgent: data.filter(r => r.priority === 'urgent').length,
      priority: data.filter(r => r.priority === 'priority').length,
      routine: data.filter(r => r.priority === 'routine').length
    }

    return summary
  }

  // Update request status
  const updateRequestStatus = async (id: string, status: RequestStatus) => {
    const updateData: any = { status }

    // Set timestamps based on status
    if (status === 'in_progress' && !updateData.started_at) {
      updateData.started_at = new Date().toISOString()
    } else if (status === 'completed' && !updateData.completed_at) {
      updateData.completed_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('radiology_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating request status:', error)
      throw error
    }

    return data as RadiologyRequest
  }

  // Create new request
  const createRequest = async (request: Omit<RadiologyRequest, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('radiology_requests')
      .insert([request])
      .select()
      .single()

    if (error) {
      console.error('Error creating radiology request:', error)
      throw error
    }

    return data as RadiologyRequest
  }

  // Subscribe to real-time changes
  const subscribeToRequests = (callback: (payload: any) => void) => {
    const channel = supabase
      .channel('radiology_requests_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'radiology_requests'
        },
        callback
      )
      .subscribe()

    return channel
  }

  return {
    fetchRequests,
    fetchRequestsFiltered,
    getRequestsSummary,
    updateRequestStatus,
    createRequest,
    subscribeToRequests
  }
}