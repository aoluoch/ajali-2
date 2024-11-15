import * as React from "react";
import { cn } from "@/lib/utils";
import PropTypes from 'prop-types'; // Import PropTypes at the top

const LocalFeatureCard = React.forwardRef(
  ({ className, icon: Icon, title, description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-center p-6 bg-[#FFE4D6] rounded-lg transition-transform hover:scale-105",
        className
      )}
      {...props}
    >
      <div className="inline-block p-4 bg-[#FF3333] rounded-full mb-4">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#B71935]">{title}</h3>
      <p className="text-[#7A0930]">{description}</p>
    </div>
  )
);

LocalFeatureCard.displayName = "FeatureCard";

// Add PropTypes
LocalFeatureCard.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType.isRequired,  // Ensures icon is a component
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  delay: PropTypes.number,
};


export default LocalFeatureCard;
