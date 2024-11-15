import * as React from "react";
import PropTypes from 'prop-types';
import cn from 'classnames'; // Add this line to import the 'cn' function

const EmergencyContactCard = React.forwardRef(({ className, icon: Icon, title, number, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center space-x-4 p-4 bg-[#FEF8EF] rounded-lg border-l-4 border-[#FF3333] hover:shadow-lg transition-shadow",
        className
      )}
      {...props}
    >
      <Icon className="h-8 w-8 text-[#DB2535]" />
      <div>
        <h3 className="font-semibold text-[#7A0930]">{title}</h3>
        <p className="text-[#FF3333] font-bold text-lg">{number}</p>
      </div>
    </div>
  ));
  
  EmergencyContactCard.displayName = "EmergencyContact";
  
  // Add PropTypes validation
  EmergencyContactCard.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.elementType.isRequired,  // Ensures icon is a component
    title: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,  // Assuming number is passed as a string, e.g., phone number
  };

  export default EmergencyContactCard