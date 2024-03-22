// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title AttendanceContact
 * @dev Attendance contract to record student attendance
 */
contract AttendanceContact {
    address public teacher;
    mapping (address => bool) studentAttendance;    // To mark the attendance of the sudent
    uint16 public constant noOfStudents = 10000;   // Total strength of the class - Immutable
    uint16 public totalPresent;

    constructor() {
        teacher = msg.sender;
        totalPresent = 0;
    }

    modifier only_teacher(address _caller) {
        require(_caller == teacher, "Only Teacher can mark attendance");
        _;
    }

    event AttandanceMarked(address _teacher, address _student, bool attendanceMarked);

    function markAttendance(address _student) external only_teacher(msg.sender) returns(uint16 _totalPresent){
        require(_student != teacher, "Teacher cannot be student");  // Ensure Not to mark attendance for teacher address
        require(!isMaxReached(), "All students marked");
        studentAttendance[_student] = true;
        totalPresent++;
        emit AttandanceMarked(msg.sender, _student, studentAttendance[_student]);
        return totalPresent;    // Returning Total number of students present
    }

    function changeTeacher(address _teacher) external {
        require(!isStudent(_teacher, msg.sender), "Student cannot be teacher/Student cannot change teacher");
        teacher = _teacher;
    }

    function isMaxReached() public view returns(bool isReached) {
        return (totalPresent < noOfStudents)? false: true;
    }

    function isStudent(address _newTeacher, address _caller) private view returns(bool _isStudent){
        return studentAttendance[_newTeacher] || studentAttendance[ _caller];
    }


}
