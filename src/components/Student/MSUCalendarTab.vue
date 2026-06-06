<script setup lang="ts">
import { ref, computed } from 'vue'

const currentDate = ref(new Date(2026, 4, 1))

const selectedDate = ref<string | null>(null)
const selectedEvents = ref<CalendarEvent[]>([])

interface CalendarEvent {
  date: string;
  title: string;
  type: 'enrollment' | 'academic' | 'holiday' | 'examination';
  ay: string;
}

const events = ref<CalendarEvent[]>([
  // =========================================================================
  // ACADEMIC YEAR 2025–2026
  // =========================================================================

  // --- FIRST SEMESTER (AY 2025-2026) ---
  { date: '2025-07-28', title: "Enrollment for Freshmen / New Students (Start)", type: 'enrollment', ay: '2025-2026' },
  { date: '2025-08-01', title: "Enrollment for Freshmen / New Students (End)", type: 'enrollment', ay: '2025-2026' },
  { date: '2025-08-04', title: "Enrollment for Old Students (Start)", type: 'enrollment', ay: '2025-2026' },
  { date: '2025-08-08', title: "Enrollment for Old Students (End)", type: 'enrollment', ay: '2025-2026' },
  { date: '2025-08-11', title: "START OF CLASSES (1st Semester)", type: 'academic', ay: '2025-2026' },
  { date: '2025-08-11', title: "Last Day for Validation of EBF & Changing Academic Status", type: 'academic', ay: '2025-2026' },
  { date: '2025-08-11', title: "Late Registration with Fines / Change-Add Period (Start)", type: 'enrollment', ay: '2025-2026' },
  { date: '2025-08-15', title: "Late Registration with Fines / Change-Add Period (End)", type: 'enrollment', ay: '2025-2026' },
  { date: '2025-08-15', title: "Last Day for Submission of Completion Grades for Previous INC", type: 'academic', ay: '2025-2026' },
  { date: '2025-08-21', title: "Ninoy Aquino Day", type: 'holiday', ay: '2025-2026' },
  { date: '2025-08-25', title: "National Heroes Day", type: 'holiday', ay: '2025-2026' },
  { date: '2025-09-01', title: "64th MSU Founding Anniversary", type: 'holiday', ay: '2025-2026' },
  { date: '2025-09-12', title: "Deadline for Tentative List of Candidates for Graduation & Auto-deletion of Unconfirmed Subjects", type: 'academic', ay: '2025-2026' },
  { date: '2025-09-15', title: "Last Day for Submission of Graduation Appeals", type: 'academic', ay: '2025-2026' },
  { date: '2025-09-15', title: "First Preliminary Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2025-09-16', title: "First Preliminary Exams: Mathematics (Whole Day)", type: 'examination', ay: '2025-2026' },
  { date: '2025-09-17', title: "First Preliminary Exams: Physics (AM) / All Other Subjects (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2025-09-20', title: "End of Preliminary Examination Week", type: 'examination', ay: '2025-2026' },
  { date: '2025-09-22', title: "Start of Period of Dropping of Subjects", type: 'academic', ay: '2025-2026' },
  { date: '2025-10-01', title: "Special Committee of MSU Main Campus Council Meeting", type: 'academic', ay: '2025-2026' },
  { date: '2025-10-10', title: "End of Period of Dropping of Subjects", type: 'academic', ay: '2025-2026' },
  { date: '2025-10-13', title: "Removal/Completion Period of Previous INC Grades (Start)", type: 'academic', ay: '2025-2026' },
  { date: '2025-10-17', title: "Removal/Completion Period of Previous INC Grades (End)", type: 'academic', ay: '2025-2026' },
  { date: '2025-10-29', title: "MSU Main Campus Council Meeting", type: 'academic', ay: '2025-2026' },
  { date: '2025-11-01', title: "All Saints' Day", type: 'holiday', ay: '2025-2026' },
  { date: '2025-11-03', title: "Midterm Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2025-11-04', title: "Midterm Exams: Mathematics (Whole Day)", type: 'examination', ay: '2025-2026' },
  { date: '2025-11-05', title: "Midterm Exams: Chemistry (AM) / Physics (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2025-11-08', title: "End of Midterm Examination Week", type: 'examination', ay: '2025-2026' },
  { date: '2025-11-07', title: "Last Day for Graduating Students to Clear Deficiencies", type: 'academic', ay: '2025-2026' },
  { date: '2025-11-10', title: "Submission of Course Offerings for Incoming Semester (Start)", type: 'academic', ay: '2025-2026' },
  { date: '2025-11-14', title: "Submission of Course Offerings for Incoming Semester (End)", type: 'academic', ay: '2025-2026' },
  { date: '2025-11-17', title: "Pre-enrollment Window & Application for Graduation Opening", type: 'enrollment', ay: '2025-2026' },
  { date: '2025-11-21', title: "End of Pre-enrollment / Last Day for Filing LOA", type: 'academic', ay: '2025-2026' },
  { date: '2025-11-30', title: "Bonifacio Day", type: 'holiday', ay: '2025-2026' },
  { date: '2025-12-05', title: "END OF CLASSES (1st Semester) & Cut-off for Graduation App", type: 'academic', ay: '2025-2026' },
  { date: '2025-12-08', title: "Feast of the Immaculate Conception", type: 'holiday', ay: '2025-2026' },
  { date: '2025-12-15', title: "Final Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2025-12-16', title: "Final Exams: Mathematics (Whole Day)", type: 'examination', ay: '2025-2026' },
  { date: '2025-12-17', title: "Final Exams: Chemistry (AM) / Physics (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2025-12-20', title: "End of Final Examination Week", type: 'examination', ay: '2025-2026' },
  { date: '2025-12-22', title: "Start of Christmas Vacation / Semestral Break", type: 'holiday', ay: '2025-2026' },
  { date: '2025-12-25', title: "Christmas Day", type: 'holiday', ay: '2025-2026' },
  { date: '2025-12-30', title: "Rizal Day", type: 'holiday', ay: '2025-2026' },

  // --- SECOND SEMESTER (AY 2025-2026) ---
  { date: '2026-01-01', title: "New Year's Day", type: 'holiday', ay: '2025-2026' },
  { date: '2026-01-02', title: "End of Christmas Break", type: 'holiday', ay: '2025-2026' },
  { date: '2026-01-05', title: "Deadline for Submission of Grades (Graduating)", type: 'academic', ay: '2025-2026' },
  { date: '2026-01-09', title: "Deadline for Submission of Grades (Non-Graduating)", type: 'academic', ay: '2025-2026' },
  { date: '2026-01-12', title: "Enrollment for Freshmen/New Students (Start)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-01-16', title: "Enrollment for Freshmen/New Students (End)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-01-19', title: "Enrollment for Old Students (Start)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-01-23', title: "Enrollment for Old Students (End)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-01-26', title: "START OF CLASSES (2nd Semester)", type: 'academic', ay: '2025-2026' },
  { date: '2026-01-26', title: "Last Day for Validation of EBF and Changing Academic Status", type: 'academic', ay: '2025-2026' },
  { date: '2026-01-26', title: "Late Registration / Change-Add Period (Start)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-01-30', title: "Late Registration / Change-Add Period (End) & Submission of 1st Sem INC Grades", type: 'academic', ay: '2025-2026' },
  { date: '2026-02-09', title: "Pre-Commencement Exercises", type: 'academic', ay: '2025-2026' },
  { date: '2026-02-10', title: "Commencement Proper", type: 'academic', ay: '2025-2026' },
  { date: '2026-02-27', title: "Deadline for Tentative Graduation Candidates & Auto-deletion of Subjects", type: 'academic', ay: '2025-2026' },
  { date: '2026-03-02', title: "Last Day of Appeal Regarding Graduation Matters", type: 'academic', ay: '2025-2026' },
  { date: '2026-03-02', title: "First Preliminary Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2026-03-03', title: "First Preliminary Exams: Mathematics (Whole Day)", type: 'examination', ay: '2025-2026' },
  { date: '2026-03-04', title: "First Preliminary Exams: Physics (AM) / All Other Subjects (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2026-03-07', title: "End of Preliminary Examination Week", type: 'examination', ay: '2025-2026' },
  { date: '2026-03-11', title: "Special Committee Meeting", type: 'academic', ay: '2025-2026' },
  { date: '2026-03-16', title: "Start of Subject Dropping Period", type: 'academic', ay: '2025-2026' },
  { date: '2026-04-02', title: "Maundy Thursday", type: 'holiday', ay: '2025-2026' },
  { date: '2026-04-03', title: "Good Friday / End of Subject Dropping Period", type: 'holiday', ay: '2025-2026' },
  { date: '2026-04-04', title: "Black Saturday", type: 'holiday', ay: '2025-2026' },
  { date: '2026-04-06', title: "Main Campus Council Meeting / INC Removal Period Start", type: 'academic', ay: '2025-2026' },
  { date: '2026-04-10', title: "End of INC Removal Period for Graduating Students", type: 'academic', ay: '2025-2026' },
  { date: '2026-04-13', title: "Midterm Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2026-04-14', title: "Midterm Exams: Mathematics (Whole Day)", type: 'examination', ay: '2025-2026' },
  { date: '2026-04-15', title: "Midterm Exams: Chemistry (AM) / Physics (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2026-04-18', title: "End of Midterm Examination Week", type: 'examination', ay: '2025-2026' },
  { date: '2026-04-17', title: "Last Day to Clear Deficiencies (Other than Current Courses)", type: 'academic', ay: '2025-2026' },
  { date: '2026-04-27', title: "Pre-enrollment Window for Next Term (Start)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-04-29', title: "Pre-enrollment Window for Next Term (End)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-05-01', title: "Labor Day", type: 'holiday', ay: '2025-2026' },
  { date: '2026-05-08', title: "Last Day for Filing Leave of Absence (LOA)", type: 'academic', ay: '2025-2026' },
  { date: '2026-05-22', title: "END OF CLASSES (2nd Semester)", type: 'academic', ay: '2025-2026' },
  { date: '2026-05-25', title: "Final Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2026-05-26', title: "Final Exams: Mathematics (Whole Day)", type: 'examination', ay: '2025-2026' },
  { date: '2026-05-27', title: "Final Exams: Chemistry (AM) / Physics (PM)", type: 'examination', ay: '2025-2026' },
  { date: '2026-05-30', title: "End of Final Examination Week", type: 'examination', ay: '2025-2026' },

  // --- SUMMER TERM (AY 2025-2026) ---
  { date: '2026-06-01', title: "Summer Enrollment (Start)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-06-05', title: "Summer Enrollment (End)", type: 'enrollment', ay: '2025-2026' },
  { date: '2026-06-08', title: "SUMMER: START OF CLASSES", type: 'academic', ay: '2025-2026' },
  { date: '2026-06-08', title: "Deadline for Submission of 2nd Semester Grades (Graduating)", type: 'academic', ay: '2025-2026' },
  { date: '2026-06-12', title: "Independence Day / Deadline for 2nd Sem Grades (Non-Graduating)", type: 'holiday', ay: '2025-2026' },
  { date: '2026-06-25', title: "Summer Midterm Examinations (Start)", type: 'examination', ay: '2025-2026' },
  { date: '2026-06-27', title: "Summer Midterm Examinations (End)", type: 'examination', ay: '2025-2026' },
  { date: '2026-07-10', title: "SUMMER: END OF CLASSES", type: 'academic', ay: '2025-2026' },
  { date: '2026-07-13', title: "Summer Final Examinations (Start)", type: 'examination', ay: '2025-2026' },
  { date: '2026-07-17', title: "Summer Final Examinations (End) & BOR Approval of Graduates", type: 'academic', ay: '2025-2026' },
  { date: '2026-07-27', title: "Pre-Commencement Exercises", type: 'academic', ay: '2025-2026' },
  { date: '2026-07-28', title: "Commencement Proper", type: 'academic', ay: '2025-2026' },
  { date: '2026-07-29', title: "Deadline for Submission of Summer Grades", type: 'academic', ay: '2025-2026' },


  // =========================================================================
  // ACADEMIC YEAR 2026–2027 (Projected Alignment Pattern)
  // =========================================================================

  // --- FIRST SEMESTER (AY 2026-2027) ---
  { date: '2026-07-27', title: "Enrollment for Freshmen / New Students (Start)", type: 'enrollment', ay: '2026-2027' },
  { date: '2026-07-31', title: "Enrollment for Freshmen / New Students (End)", type: 'enrollment', ay: '2026-2027' },
  { date: '2026-08-03', title: "Enrollment for Old Students (Start)", type: 'enrollment', ay: '2026-2027' },
  { date: '2026-08-07', title: "Enrollment for Old Students (End)", type: 'enrollment', ay: '2026-2027' },
  { date: '2026-08-10', title: "START OF CLASSES (1st Semester)", type: 'academic', ay: '2026-2027' },
  { date: '2026-08-10', title: "Last Day for Validation of EBF & Changing Academic Status", type: 'academic', ay: '2026-2027' },
  { date: '2026-08-10', title: "Late Registration / Change-Add Period (Start)", type: 'enrollment', ay: '2026-2027' },
  { date: '2026-08-14', title: "Late Registration / Change-Add Period (End) & INC Submission", type: 'academic', ay: '2026-2027' },
  { date: '2026-08-21', title: "Ninoy Aquino Day", type: 'holiday', ay: '2026-2027' },
  { date: '2026-08-31', title: "National Heroes Day", type: 'holiday', ay: '2026-2027' },
  { date: '2026-09-01', title: "65th MSU Founding Anniversary", type: 'holiday', ay: '2026-2027' },
  { date: '2026-09-11', title: "Deadline for Graduation Candidates List & Subject Auto-deletion", type: 'academic', ay: '2026-2027' },
  { date: '2026-09-14', title: "Last Day for Submission of Graduation Appeals", type: 'academic', ay: '2026-2027' },
  { date: '2026-09-14', title: "First Preliminary Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2026-09-15', title: "First Preliminary Exams: Mathematics (Whole Day)", type: 'examination', ay: '2026-2027' },
  { date: '2026-09-16', title: "First Preliminary Exams: Physics (AM) / All Other Subjects (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2026-09-19', title: "End of Preliminary Examination Week", type: 'examination', ay: '2026-2027' },
  { date: '2026-09-21', title: "Start of Period of Dropping of Subjects", type: 'academic', ay: '2026-2027' },
  { date: '2026-10-01', title: "Special Campus Council Committee Meeting", type: 'academic', ay: '2026-2027' },
  { date: '2026-10-09', title: "End of Period of Dropping of Subjects", type: 'academic', ay: '2026-2027' },
  { date: '2026-10-12', title: "Removal/Completion Period of Previous INC Grades (Start)", type: 'academic', ay: '2026-2027' },
  { date: '2026-10-16', title: "Removal/Completion Period of Previous INC Grades (End)", type: 'academic', ay: '2026-2027' },
  { date: '2026-10-28', title: "MSU Main Campus Council Meeting", type: 'academic', ay: '2026-2027' },
  { date: '2026-11-01', title: "All Saints' Day", type: 'holiday', ay: '2026-2027' },
  { date: '2026-11-02', title: "Midterm Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2026-11-03', title: "Midterm Exams: Mathematics (Whole Day)", type: 'examination', ay: '2026-2027' },
  { date: '2026-11-04', title: "Midterm Exams: Chemistry (AM) / Physics (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2026-11-07', title: "End of Midterm Examination Week", type: 'examination', ay: '2026-2027' },
  { date: '2026-11-06', title: "Last Day for Graduating Students to Clear Deficiencies", type: 'academic', ay: '2026-2027' },
  { date: '2026-11-09', title: "Submission of Course Offerings for Incoming Semester (Start)", type: 'academic', ay: '2026-2027' },
  { date: '2026-11-13', title: "Submission of Course Offerings for Incoming Semester (End)", type: 'academic', ay: '2026-2027' },
  { date: '2026-11-16', title: "Pre-enrollment Window & Application for Graduation Opening", type: 'enrollment', ay: '2026-2027' },
  { date: '2026-11-20', title: "End of Pre-enrollment / Last Day for Filing LOA", type: 'academic', ay: '2026-2027' },
  { date: '2026-11-30', title: "Bonifacio Day", type: 'holiday', ay: '2026-2027' },
  { date: '2026-12-04', title: "END OF CLASSES (1st Semester) & Graduation App Cut-off", type: 'academic', ay: '2026-2027' },
  { date: '2026-12-08', title: "Feast of the Immaculate Conception", type: 'holiday', ay: '2026-2027' },
  { date: '2026-12-14', title: "Final Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2026-12-15', title: "Final Exams: Mathematics (Whole Day)", type: 'examination', ay: '2026-2027' },
  { date: '2026-12-16', title: "Final Exams: Chemistry (AM) / Physics (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2026-12-19', title: "End of Final Examination Week", type: 'examination', ay: '2026-2027' },
  { date: '2026-12-21', title: "Start of Christmas Vacation / Semestral Break", type: 'holiday', ay: '2026-2027' },
  { date: '2026-12-25', title: "Christmas Day", type: 'holiday', ay: '2026-2027' },
  { date: '2026-12-30', title: "Rizal Day", type: 'holiday', ay: '2026-2027' },

  // --- SECOND SEMESTER (AY 2026-2027) ---
  { date: '2027-01-01', title: "New Year's Day", type: 'holiday', ay: '2026-2027' },
  { date: '2027-01-04', title: "End of Christmas Break & Grades Submission (Graduating)", type: 'academic', ay: '2026-2027' },
  { date: '2027-01-08', title: "Deadline for Submission of Grades (Non-Graduating)", type: 'academic', ay: '2026-2027' },
  { date: '2027-01-11', title: "Enrollment for Freshmen/New Students (Start)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-01-15', title: "Enrollment for Freshmen/New Students (End)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-01-18', title: "Enrollment for Old Students (Start)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-01-22', title: "Enrollment for Old Students (End)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-01-25', title: "START OF CLASSES (2nd Semester)", type: 'academic', ay: '2026-2027' },
  { date: '2027-01-25', title: "Last Day for Validation of EBF and Changing Academic Status", type: 'academic', ay: '2026-2027' },
  { date: '2027-01-25', title: "Late Registration / Change-Add Period (Start)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-01-29', title: "Late Registration / Change-Add Period (End) & INC Submission", type: 'academic', ay: '2026-2027' },
  { date: '2027-02-08', title: "Pre-Commencement Exercises", type: 'academic', ay: '2026-2027' },
  { date: '2027-02-09', title: "Commencement Proper", type: 'academic', ay: '2026-2027' },
  { date: '2027-02-26', title: "Deadline for Tentative Graduation Candidates & Auto-deletion of Subjects", type: 'academic', ay: '2026-2027' },
  { date: '2027-03-01', title: "Last Day of Appeal Regarding Graduation Matters", type: 'academic', ay: '2026-2027' },
  { date: '2027-03-01', title: "First Preliminary Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2027-03-02', title: "First Preliminary Exams: Mathematics (Whole Day)", type: 'examination', ay: '2026-2027' },
  { date: '2027-03-03', title: "First Preliminary Exams: Physics (AM) / All Other Subjects (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2027-03-06', title: "End of Preliminary Examination Week", type: 'examination', ay: '2026-2027' },
  { date: '2027-03-10', title: "Special Committee Meeting", type: 'academic', ay: '2026-2027' },
  { date: '2027-03-15', title: "Start of Subject Dropping Period", type: 'academic', ay: '2026-2027' },
  { date: '2027-03-25', title: "Maundy Thursday", type: 'holiday', ay: '2026-2027' },
  { date: '2027-03-26', title: "Good Friday / End of Subject Dropping Period", type: 'holiday', ay: '2026-2027' },
  { date: '2027-03-27', title: "Black Saturday", type: 'holiday', ay: '2026-2027' },
  { date: '2027-04-05', title: "Main Campus Council Meeting / INC Removal Period Start", type: 'academic', ay: '2026-2027' },
  { date: '2027-04-09', title: "End of INC Removal Period for Graduating Students", type: 'academic', ay: '2026-2027' },
  { date: '2027-04-12', title: "Midterm Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2027-04-13', title: "Midterm Exams: Mathematics (Whole Day)", type: 'examination', ay: '2026-2027' },
  { date: '2027-04-14', title: "Midterm Exams: Chemistry (AM) / Physics (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2027-04-17', title: "End of Midterm Examination Week", type: 'examination', ay: '2026-2027' },
  { date: '2027-04-16', title: "Last Day to Clear Deficiencies (Other than Current Courses)", type: 'academic', ay: '2026-2027' },
  { date: '2027-04-26', title: "Pre-enrollment Window for Next Term (Start)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-04-28', title: "Pre-enrollment Window for Next Term (End)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-05-01', title: "Labor Day", type: 'holiday', ay: '2026-2027' },
  { date: '2027-05-07', title: "Last Day for Filing Leave of Absence (LOA)", type: 'academic', ay: '2026-2027' },
  { date: '2027-05-21', title: "END OF CLASSES (2nd Semester)", type: 'academic', ay: '2026-2027' },
  { date: '2027-05-24', title: "Final Exams: English (AM) / Philosophy (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2027-05-25', title: "Final Exams: Mathematics (Whole Day)", type: 'examination', ay: '2026-2027' },
  { date: '2027-05-26', title: "Final Exams: Chemistry (AM) / Physics (PM)", type: 'examination', ay: '2026-2027' },
  { date: '2027-05-29', title: "End of Final Examination Week", type: 'examination', ay: '2026-2027' },

  // --- SUMMER TERM (AY 2026-2027) ---
  { date: '2027-05-31', title: "Summer Enrollment (Start)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-06-04', title: "Summer Enrollment (End)", type: 'enrollment', ay: '2026-2027' },
  { date: '2027-06-07', title: "SUMMER: START OF CLASSES", type: 'academic', ay: '2026-2027' },
  { date: '2027-06-07', title: "Deadline for Submission of 2nd Semester Grades (Graduating)", type: 'academic', ay: '2026-2027' },
  { date: '2027-06-12', title: "Independence Day / Deadline for 2nd Sem Grades (Non-Graduating)", type: 'holiday', ay: '2026-2027' },
  { date: '2027-06-24', title: "Summer Midterm Examinations (Start)", type: 'examination', ay: '2026-2027' },
  { date: '2027-06-26', title: "Summer Midterm Examinations (End)", type: 'examination', ay: '2026-2027' },
  { date: '2027-07-09', title: "SUMMER: END OF CLASSES", type: 'academic', ay: '2026-2027' },
  { date: '2027-07-12', title: "Summer Final Examinations (Start)", type: 'examination', ay: '2026-2027' },
  { date: '2027-07-16', title: "Summer Final Examinations (End) & BOR Approval of Graduates", type: 'academic', ay: '2026-2027' },
  { date: '2027-07-26', title: "Pre-Commencement Exercises", type: 'academic', ay: '2026-2027' },
  { date: '2027-07-27', title: "Commencement Proper", type: 'academic', ay: '2026-2027' },
  { date: '2027-07-28', title: "Deadline for Submission of Summer Grades", type: 'academic', ay: '2026-2027' }
])

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const monthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = []
  
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, date: null, events: [] })
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const dayEvents = events.value.filter(e => e.date === dateStr)
    const isToday = dateStr === '2026-05-23'

    days.push({ day: i, date: dateStr, events: dayEvents, isToday })
  }
  
  return days
})

const changeMonth = (delta: number) => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + delta, 1)
  selectedDate.value = null 
}

const handleDateClick = (cell: any) => {
  if (cell.events && cell.events.length > 0) {
    selectedDate.value = cell.date
    selectedEvents.value = cell.events
  } else {
    selectedDate.value = null
    selectedEvents.value = []
  }
}

const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return ''
  const dateObj = new Date(selectedDate.value)
  return dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

</script>

<template>
  <div class="calendar-container">
    <div class="calendar-wrapper">
      
      <div class="calendar-header">
        <h2>MSU Academic Calendar</h2>
        <div class="controls">
          <button @click="changeMonth(-1)">&#8592; Prev</button>
          <h3>{{ monthName }}</h3>
          <button @click="changeMonth(1)">Next &#8594;</button>
        </div>
      </div>

      <div class="calendar-grid">
        <div v-for="day in weekDays" :key="day" class="weekday">
          {{ day }}
        </div>

        <div 
          v-for="(cell, index) in calendarDays" 
          :key="index" 
          class="day-cell" 
          :class="{ 
            'empty': !cell.day, 
            'today': cell.isToday, 
            'has-events': cell.events && cell.events.length > 0,
            'selected': cell.date === selectedDate 
          }"
          @click="handleDateClick(cell)"
        >
          <div v-if="cell.day" class="day-number">{{ cell.day }}</div>
          
          <div class="events-list">
            <div 
              v-for="(event, eIndex) in cell.events" 
              :key="eIndex" 
              class="event-badge"
              :class="event.type"
            >
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>

      <div class="calendar-legend">
        <span class="legend-item"><span class="color-box academic"></span> Academic / General</span>
        <span class="legend-item"><span class="color-box exam"></span> Examinations</span>
        <span class="legend-item"><span class="color-box enrollment"></span> Enrollment</span>
        <span class="legend-item"><span class="color-box holiday"></span> Holidays</span>
      </div>

      <div v-if="selectedDate" class="event-details-box">
        <h3>Events for {{ formattedSelectedDate }}</h3>
        <ul class="event-details-list">
          <li v-for="(event, index) in selectedEvents" :key="index">
            <span class="color-dot" :class="event.type"></span>
            <strong>{{ event.title }}</strong>
            <span class="event-type-label">({{ event.type.charAt(0).toUpperCase() + event.type.slice(1) }})</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
  background: white;
  box-sizing: border-box;
}

.calendar-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.calendar-header h2 {
  margin: 0;
  color: #800000;
  font-weight: 800;
}

.controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.controls h3 {
  margin: 0;
  min-width: 150px;
  text-align: center;
  color: #334155;
  font-size: 1.1rem;
}

.controls button {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: #334155;
  transition: 0.2s;
}

.controls button:hover {
  background: #800000;
  color: white;
  border-color: #800000;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.weekday {
  text-align: center;
  font-weight: 700;
  color: #64748b;
  padding: 8px 0;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.9rem;
}

.day-cell {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px;
  min-height: 80px; 
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
}

.day-cell.has-events {
  cursor: pointer;
}

.day-cell.has-events:hover {
  border-color: #94a3b8;
  background: #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.day-cell.selected {
  border: 2px solid #800000;
  background: #fff;
}

.day-cell.empty {
  background: transparent;
  border: none;
  cursor: default;
}

.day-cell.today {
  border: 2px solid #ffd700;
  background: #fffbeb;
}

.day-number {
  font-weight: 700;
  color: #334155;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden; 
}

.event-badge {
  font-size: 0.65rem;
  padding: 2px 4px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  pointer-events: none; 
}

/* Event Types Colors */
.academic { background: #3b82f6; } 
.exam { background: #e11d48; } 
.enrollment { background: #10b981; } 
.holiday { background: #f59e0b; } 

.calendar-legend {
  display: flex;
  gap: 15px;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.85rem;
  color: #64748b;
  justify-content: center;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.color-box {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  display: inline-block;
}

.event-details-box {
  margin-top: 20px;
  padding: 15px 20px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  border-left: 5px solid #800000;
}

.event-details-box h3 {
  margin: 0 0 10px 0;
  color: #334155;
  font-size: 1.1rem;
}

.event-details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-details-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #475569;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.event-type-label {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-left: 5px;
}
</style>
