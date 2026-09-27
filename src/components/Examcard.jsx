import { Clock, FileQuestion, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExamCard({
  id,
  title,
  subject,
  questions,
  duration,
  difficulty,
  startTime,
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">{subject}</p>

          <h3 className="mt-1 text-lg font-bold text-slate-800">
            {title}
          </h3>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {difficulty}
        </span>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <FileQuestion size={17} />
          {questions} Questions
        </div>

        <div className="flex items-center gap-2">
          <Clock size={17} />
          {duration} Minutes
        </div>
      </div>

      <p className="mb-5 text-sm text-slate-500">
        Starts: {startTime}
      </p>

      <button
        onClick={() => navigate(`/student/exams/${id}`)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        View Exam
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default ExamCard;