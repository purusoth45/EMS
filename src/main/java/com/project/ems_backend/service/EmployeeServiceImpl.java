package com.project.ems_backend.service;

import com.project.ems_backend.dto.EmployeeDto;
import com.project.ems_backend.entity.Employee;
import com.project.ems_backend.exception.ResourceNotFoundException;
import com.project.ems_backend.mapper.EmployeeMapper;
import com.project.ems_backend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private  HandlerExceptionResolver handlerExceptionResolver;
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee createEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(createEmployee);

    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exist with given Id:" + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees = employeeRepository.findAll();
        return  employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee in not exists with given Id: " + employeeId));
        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLasttName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());

        Employee updatedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
            Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee in not exists with given Id: " + employeeId));
            employeeRepository.deleteById(employeeId);
    }
}
