import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Attendee {
  id: string;
  name: string;
  bio?: string;
  image_url?: string;
  company?: string;
  role?: string;
  event_role?: 'speaker' | 'hacker' | 'organizer' | 'guest' | 'helper' | 'founder';
}

const roleEmojis = {
  founder: '⭐',
  organizer: '🎯',
  helper: '🤝',
  guest: '👥',
  speaker: '🎤',
  hacker: '💻'
};

const roleLabels = {
  founder: 'Founder',
  organizer: 'Organizer',
  helper: 'Helper',
  guest: 'Guest',
  speaker: 'Speaker',
  hacker: 'Hacker'
};

export default function WhosComing() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  const sortAttendees = (data: Attendee[]) => {
    // Sort by event_role: founder → organizer → helper → guest → speaker → hacker → no role
    const roleOrder = { founder: 1, organizer: 2, helper: 3, guest: 4, speaker: 5, hacker: 6 };
    return data.sort((a, b) => {
      const aOrder = a.event_role ? roleOrder[a.event_role as keyof typeof roleOrder] || 7 : 7;
      const bOrder = b.event_role ? roleOrder[b.event_role as keyof typeof roleOrder] || 7 : 7;
      return aOrder - bOrder;
    });
  };

  useEffect(() => {
    // Fetch initial attendees
    async function fetchAttendees() {
      try {
        const { data, error } = await supabase
          .from('attendees')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching attendees:', error);
        } else {
          setAttendees(sortAttendees(data || []));
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAttendees();

    // Set up real-time subscription for new/updated attendees
    const channel = supabase
      .channel('attendees-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'attendees'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Add new attendee and re-sort
            setAttendees(prev => sortAttendees([...prev, payload.new as Attendee]));
          } else if (payload.eventType === 'UPDATE') {
            // Update existing attendee and re-sort
            setAttendees(prev => sortAttendees(
              prev.map(a => a.id === payload.new.id ? payload.new as Attendee : a)
            ));
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted attendee
            setAttendees(prev => prev.filter(a => a.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 text-center">
        <div className="text-white text-xl">Loading attendees...</div>
      </div>
    );
  }

  if (attendees.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Who's Coming</h2>
        <p className="text-white/70">Be the first to register!</p>
      </div>
    );
  }

  return (
    <div className="w-full py-20 px-4 md:px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        Who's Coming
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {attendees.map((attendee, index) => (
          <div
            key={attendee.id}
            className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-fade-in-1"
            style={{ 
              aspectRatio: '3/4',
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Image Background - Only takes up top 70% */}
            <div className="absolute top-0 left-0 right-0 h-[70%]">
              {attendee.image_url ? (
                <img
                  src={attendee.image_url}
                  alt={attendee.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500" />
              )}
            </div>
            
            {/* Background for bottom 30% */}
            <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gray-900" />

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Event Role Badge */}
            {attendee.event_role && (
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/30">
                  <span>{roleEmojis[attendee.event_role]}</span>
                  <span>{roleLabels[attendee.event_role]}</span>
                </span>
              </div>
            )}

            {/* Top Section - Name, Role, Company */}
            <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/50 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {attendee.name}
              </h3>
              
              {(attendee.role || attendee.company) && (
                <div className="text-white/95 text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block border border-white/20">
                  {attendee.role && <span>{attendee.role}</span>}
                  {attendee.role && attendee.company && <span> • </span>}
                  {attendee.company && <span>{attendee.company}</span>}
                </div>
              )}
            </div>

            {/* Bottom Section - Bio with distinct background */}
            {attendee.bio && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent backdrop-blur-sm p-6 pt-8 border-t border-white/10">
                {attendee.bio.includes('•') ? (
                  <ul className="space-y-2.5">
                    {attendee.bio.split('•').map((point, idx) => {
                      const trimmedPoint = point.trim();
                      return trimmedPoint ? (
                        <li key={idx} className="text-white/95 text-sm leading-relaxed flex items-start gap-2.5">
                          <span className="text-lg flex-shrink-0">🥯</span>
                          <span className="flex-1">{trimmedPoint}</span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                ) : (
                  <p className="text-white/95 text-sm leading-relaxed">
                    {attendee.bio}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

