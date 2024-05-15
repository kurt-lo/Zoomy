import MeetingType from "@/components/MeetingType";

export default function Home() {

  const date = new Date();

  const timeToday = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const dateToday = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(date);

  return (
    <section className="flex flex-col size-full gap-10">
      <div className="h-[300px] w-full rounded-3xl bg-stone-500">
        <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="text-center text-balance bg-primary py-2 rounded-2xl px-2">
            Upcoming Meeting at 12:30 PM
          </h2>
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
