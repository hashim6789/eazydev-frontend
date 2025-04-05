import { Users, BookOpen, Award, BarChart3 } from "lucide-react";
import teacher1 from "../../../assets/img/teacher_01.jpg";
import teacher2 from "../../../assets/img/teacher_02.jpg";
import teacher3 from "../../../assets/img/teacher_03.jpg";
import teacher4 from "../../../assets/img/teacher_04.jpg";
import teacher5 from "../../../assets/img/teacher_05.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Our Features
          </h1>
          <p className="text-gray-600">
            The very extraordinary features can make learning activities more
            efficient
          </p>
        </div>

        {/* User Interface Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-4">
              {[teacher1, teacher2, teacher3, teacher4, teacher5].map(
                (image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Teacher ${index}`}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    {/* {i === 1 && (
                    <span className="absolute bottom-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-br-lg rounded-tl-lg text-sm">
                      Online
                    </span>
                  )} */}
                  </div>
                )
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                A user interface designed for the classroom
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>
                    Teachers don't get lost in the grid view and have a
                    dedicated meeting space
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>
                    File and powerpoints can be moved to the front of the class
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span>
                    Teachers can easily see all students and class data at one
                    time
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-cyan-200 rounded-full opacity-50" />
            <img
              src={teacher1}
              alt="Teacher"
              className="relative z-10 rounded-2xl"
            />
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-blue-200 rounded-full opacity-50" />
          </div>
        </div>

        {/* Tools Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Tools <span className="text-blue-600">For Mentors</span>
              <br />
              And Learners
            </h2>
            <p className="text-gray-600">
              Start with a dynamic set of teaching tools built to be deployed
              and used within existing static training. Teachers can download
              assignments in real-time for students to complete and submit.
            </p>
          </div>
          <div className="relative">
            <img
              src={teacher2}
              alt="Student with books"
              className="rounded-2xl"
            />
            <div className="absolute top-4 right-4 animate-bounce">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="text-lg font-semibold mb-2">
                True or false? This play takes place in Italy
              </h3>
              <img src={teacher3} alt="Venice" className="rounded-lg mb-4" />
              <div className="flex justify-end">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Your answer was correct!
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Assessments,
              <br />
              <span className="text-blue-600">Quizzes, Tests</span>
            </h2>
            <p className="text-gray-600">
              Easily launch live assignments, quizzes, and tests. Student
              results are automatically entered in the online gradebook.
            </p>
          </div>
        </div>

        {/* Class Management Section */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Class Management
              <br />
              <span className="text-blue-600">Tools for Educators</span>
            </h2>
            <p className="text-gray-600">
              Class activities become more engaging with class tools such as
              Class Roster, Attendance, and more. With the Gradebook, teachers
              can track and grade student progress.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {[teacher1, teacher2, teacher3].map((image, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={image}
                    alt={`Student ${index}`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div
                      className={`h-2 rounded-full ${
                        index === 1
                          ? "bg-blue-500"
                          : index === 2
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                      style={{ width: `${(4 - index) * 25}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {90 - index * 10}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
