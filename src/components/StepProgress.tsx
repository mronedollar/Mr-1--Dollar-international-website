import { CheckCircle, Circle, ArrowRight } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  completedSteps: boolean[];
}

const StepProgress = ({ currentStep, completedSteps }: StepProgressProps) => {
  const steps = [
    { id: 1, label: "Sign Up with Broker", description: "Create trading account" },
    { id: 2, label: "Register for Event", description: "Secure your spot" },
    { id: 3, label: "Get Access Code", description: "Join Telegram group" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-border z-0">
          <div 
            className="h-full bg-gradient-to-r from-gold to-blue transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            {/* Step Circle */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
              ${completedSteps[index] 
                ? 'bg-green-500 text-white' 
                : currentStep === step.id 
                  ? 'bg-gold text-black animate-pulse' 
                  : 'bg-muted text-muted-foreground'
              }
            `}>
              {completedSteps[index] ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <span className="font-bold">{step.id}</span>
              )}
            </div>

            {/* Step Info */}
            <div className="mt-4 text-center max-w-32">
              <p className={`
                font-semibold text-sm
                ${completedSteps[index] 
                  ? 'text-green-500' 
                  : currentStep === step.id 
                    ? 'text-gold' 
                    : 'text-muted-foreground'
                }
              `}>
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {step.description}
              </p>
            </div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <ArrowRight className="absolute top-6 -right-4 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;