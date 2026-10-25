import type { Status } from '../data/types';
import { STATUS_LABEL } from '../lib/logic';

export default function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge badge-${status}`}>{STATUS_LABEL[status]}</span>;
}
