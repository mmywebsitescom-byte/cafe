export function isValidEmail(email: string): boolean {
  if (!email) return true; // optional
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateFeedbackForm(data: { name: string; rating: number; comment: string }): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  if (!data.name.trim()) {
    errors.name = 'Please provide your name';
  }
  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Please select a rating between 1 and 5 stars';
  }
  if (!data.comment.trim() || data.comment.trim().length < 5) {
    errors.comment = 'Please share a few words about your experience (at least 5 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
