// #region Imports
import React, { useState } from "react";
import "./debugger-console.css";
// #endregion Imports

// #region Definitions
export interface DebuggerConsoleProps {
    debugData: any;
    children: React.ReactNode;
    section:string;
}
// #endregion Definitions

/**
 * DebuggerConsole component with collapsible/expandable functionality
 * Displays debug information in an overlay without pushing down content
 * @param props 
 * @returns 
 */
const DebuggerConsole: React.FC<DebuggerConsoleProps> = ({
    debugData,
    children,
    section
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="debugger-console-wrapper">
            {/* Debug Console Bar - Always visible at top */}
            <div className={`debugger-console-bar ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <button 
                    className="debugger-console-toggle"
                    onClick={toggleExpanded}
                    aria-label={isExpanded ? 'Collapse debug console' : 'Expand debug console'}
                >
                    <span className={`debugger-console-arrow ${isExpanded ? 'up' : 'down'}`}>
                        ▼
                    </span>
                </button>
              
                <div className="debugger-console-status">
                    <span className="debug-mode-text">Debug mode enabled</span>
                    <span className="section-mode-text">{section}</span>
                </div>
            </div>

            {/* Debug Content - Only visible when expanded */}
            {isExpanded && (
                <div className="debugger-console-content">
                    <div className="debugger-console-panel">
                        <code>
                            <pre>{JSON.stringify(debugData, null, 2)}</pre>
                        </code>
                    </div>
                </div>
            )}

            {/* Main content - always rendered */}
            <div className="debugger-console-main-content">
                {children}
            </div>
        </div>
    );
};

export default DebuggerConsole;