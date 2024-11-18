export const calculatePriority = (dueDate) => {
    const today = new Date();
    const timeDiff = new Date(dueDate) - today;
    const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    if (daysUntilDue <= 2) return 'urgent';
    if (daysUntilDue <= 7) return 'high';
    if (daysUntilDue <= 10) return 'moderate';
    return 'low';
  };