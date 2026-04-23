const configs = {
  // Reservation statuses
  pending:     { label: 'Pending',     cls: 'badge-pending' },
  confirmed:   { label: 'Confirmed',   cls: 'badge-confirmed' },
  checked_in:  { label: 'Checked In',  cls: 'badge-checked_in' },
  checked_out: { label: 'Checked Out', cls: 'badge-checked_out' },
  cancelled:   { label: 'Cancelled',   cls: 'badge-cancelled' },
  // Room statuses
  available:   { label: 'Available',   cls: 'badge-available' },
  occupied:    { label: 'Occupied',    cls: 'badge-occupied' },
  reserved:    { label: 'Reserved',    cls: 'badge-reserved' },
  maintenance: { label: 'Maintenance', cls: 'badge-maintenance' },
  // Service statuses
  in_progress: { label: 'In Progress', cls: 'badge bg-blue-100 text-blue-700' },
  completed:   { label: 'Completed',   cls: 'badge bg-emerald-100 text-emerald-700' },
};

export default function StatusBadge({ status }) {
  const cfg = configs[status] || { label: status, cls: 'badge bg-gray-100 text-gray-600' };
  return <span className={cfg.cls}>{cfg.label}</span>;
}
