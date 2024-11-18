import { useSelector, useDispatch } from 'react-redux';
import {
  fetchIncidents,
  createIncident,
  updateIncident,
  deleteIncident
} from '../store/slices/incidentSlice';

export const useIncidents = () => {
  const dispatch = useDispatch();
  const { incidents, loading, error, currentIncident } = useSelector((state) => state.incidents);

  const getIncidents = async () => {
    const resultAction = await dispatch(fetchIncidents());
    if (fetchIncidents.fulfilled.match(resultAction)) {
      return { success: true, data: resultAction.payload };
    }
    return { success: false, error: resultAction.payload };
  };

  const addIncident = async (incidentData) => {
    const resultAction = await dispatch(createIncident(incidentData));
    if (createIncident.fulfilled.match(resultAction)) {
      return { success: true, data: resultAction.payload };
    }
    return { success: false, error: resultAction.payload };
  };

  const editIncident = async (id, data) => {
    const resultAction = await dispatch(updateIncident({ id, data }));
    if (updateIncident.fulfilled.match(resultAction)) {
      return { success: true, data: resultAction.payload };
    }
    return { success: false, error: resultAction.payload };
  };

  const removeIncident = async (id) => {
    const resultAction = await dispatch(deleteIncident(id));
    if (deleteIncident.fulfilled.match(resultAction)) {
      return { success: true };
    }
    return { success: false, error: resultAction.payload };
  };

  return {
    incidents,
    loading,
    error,
    currentIncident,
    getIncidents,
    createIncident: addIncident,
    updateIncident: editIncident,
    deleteIncident: removeIncident
  };
};