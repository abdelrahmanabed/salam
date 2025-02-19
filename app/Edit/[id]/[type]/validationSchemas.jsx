import * as Yup from 'yup';

// Validation schema for abnormal events
export const abnormalValidationSchema = Yup.object().shape({
  location: Yup.string()
    .required('Location is required')
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location must not exceed 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  eventType: Yup.string()
    .required('Event type is required')
    .oneOf(
      ['Near miss', 'Property Damage', 'Environmental Harm', 'First Aid', 'Medical Treatment', 'LTI', 'Fatality'],
      'Invalid event type'
    ),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['Open', 'In Progress', 'Closed'], 'Invalid status'),
  project: Yup.string()
    .required('Project is required'),
  imagesToDelete: Yup.array().of(Yup.string())
});

// Validation schema for observations
export const observationValidationSchema = Yup.object().shape({
  location: Yup.string()
    .required('Location is required')
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location must not exceed 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  type: Yup.string()
    .required('Observation type is required'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['Open', 'In Progress', 'Closed'], 'Invalid status'),
  project: Yup.string()
    .required('Project is required'),
  imagesToDelete: Yup.array().of(Yup.string())
});