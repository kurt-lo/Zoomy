import MeetingType from "@/components/MeetingType";

export default function Home() {

  const date = new Date();

  const timeToday = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const dateToday = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(date);

  return (
    <section className="flex flex-col size-full gap-10 ">
      <div className="h-[300px] w-full rounded-3xl backdrop-blur-sm bg-white/30">
        <div className="flex flex-col h-full justify-between p-11">
          <h1 className="text-balance py-2 rounded-2xl px-2 text-3xl font-bold">
            Welcome to the Zoomy Video Call
          </h1>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">
              {timeToday}
            </h1>
            <p className="text-lg font-medium italic">
              {dateToday}
            </p>
          </div>
        </div>
      </div>
      <MeetingType />
    </section>
  )
}
