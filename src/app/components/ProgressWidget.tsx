interface ProgressWidgetProps {
    title: string;
    subtitle: string;
    value: string;
    unit: string;
    linkText?: string;
}

const ProgressWidget = ({ title, subtitle, value, unit, linkText }: ProgressWidgetProps) => {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

            <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                <span className="text-sm text-gray-500">{unit}</span>
            </div>

            {linkText && (
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-700">
                    {linkText}
                </button>
            )}
        </div>
    );
};

export default ProgressWidget;