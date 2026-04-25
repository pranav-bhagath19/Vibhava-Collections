import React from 'react';
import { CheckCircle2, Clock, Package, Truck, Home, MapPin, XCircle } from 'lucide-react';
import { TrackingEvent } from '@/types';

interface TrackingTimelineProps {
  timeline: TrackingEvent[];
  currentStatus: string;
}

const statusConfig = {
  placed: { icon: Clock, label: 'Order Placed', color: 'bg-blue-500' },
  confirmed: { icon: CheckCircle2, label: 'Confirmed', color: 'bg-indigo-500' },
  packed: { icon: Package, label: 'Packed', color: 'bg-amber-500' },
  shipped: { icon: Truck, label: 'Shipped', color: 'bg-purple-500' },
  out_for_delivery: { icon: MapPin, label: 'Out for Delivery', color: 'bg-orange-500' },
  delivered: { icon: Home, label: 'Delivered', color: 'bg-green-500' },
  cancelled: { icon: XCircle, label: 'Cancelled', color: 'bg-red-500' }
};

const allStatuses: (keyof typeof statusConfig)[] = [
  'placed',
  'confirmed',
  'packed',
  'shipped',
  'out_for_delivery',
  'delivered'
];

export default function TrackingTimeline({ timeline, currentStatus }: TrackingTimelineProps) {
  if (currentStatus === 'cancelled') {
    const cancelEvent = timeline.find(e => e.status === 'cancelled');
    return (
      <div className="flex items-center gap-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
        <XCircle size={24} />
        <div>
          <p className="font-bold uppercase tracking-widest text-[10px]">Order Cancelled</p>
          <p className="text-sm">{cancelEvent?.message || 'This order has been cancelled.'}</p>
          <p className="text-[10px] mt-1 opacity-70">{cancelEvent ? new Date(cancelEvent.timestamp).toLocaleString() : ''}</p>
        </div>
      </div>
    );
  }

  const currentIndex = allStatuses.indexOf(currentStatus as any);

  return (
    <div className="py-8">
      <div className="relative flex justify-between items-start">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-10" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-1000 -z-10" 
          style={{ width: `${(currentIndex / (allStatuses.length - 1)) * 100}%` }}
        />

        {allStatuses.map((status, index) => {
          const config = statusConfig[status];
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          const event = timeline.find(e => e.status === status);

          return (
            <div key={status} className="flex flex-col items-center flex-1">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white border-2 border-gray-100 text-gray-300'
                } ${isActive ? 'ring-4 ring-primary/20' : ''}`}
              >
                <config.icon size={18} />
              </div>
              
              <div className="mt-4 text-center">
                <p className={`text-[9px] uppercase tracking-tighter font-bold ${isCompleted ? 'text-luxury' : 'text-gray-400'}`}>
                  {config.label}
                </p>
                {event && (
                  <p className="text-[8px] text-gray-400 mt-1 whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Status Message */}
      <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-xs font-bold text-luxury mb-1">Latest Update</p>
        <p className="text-sm text-gray-600 leading-relaxed italic">
          "{timeline[timeline.length - 1]?.message || 'Your order is being processed.'}"
        </p>
      </div>
    </div>
  );
}
