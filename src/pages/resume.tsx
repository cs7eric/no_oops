import DefaultLayout from "@/layouts/default";

export default function ResumePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col  justify-center gap-4 py-2 md:py-3 px-4 md:px-8">

        <div className="personal-info">
          <h3 className={'text-left text-lg sm:text-xl font-semibold'}>陈帅旗</h3>
        </div>
        <div className="school-info font-semibold text-sm sm:text-md md:text-lg flex justify-between">
          <span className="school-name ">计算机科学与技术专业</span>
          <span className="year">2021.09 - 2025.06</span>
        </div>
        <div className="school-detail text-sm sm:text-base">
          <p>成绩优异， <strong>GPA 3.7/4.0 前7%</strong>，<strong>通过CET-4\CET-6</strong></p>
        </div>
      </section>
    </DefaultLayout>
  );
}
