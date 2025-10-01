import { useState } from "react";
import { Text } from "@shopify/polaris";
import { WHATSAPP_VARIABLES } from "./constants/variables.constant";

interface VariablePanelProps {
  showVariables: boolean;
  setShowVariables: (show: boolean) => void;
}

export function VariablePanel({ showVariables, setShowVariables }: VariablePanelProps) {
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);

  return (
    <div style={{ 
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e1e3e5',
      zIndex: 1000
    }}>
      {/* Toggle Button */}
      <div 
        style={{ 
          padding: '12px 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8f9fa',
          borderBottom: showVariables ? '1px solid #e1e3e5' : 'none'
        }}
        onClick={() => setShowVariables(!showVariables)}
      >
        <Text as="span" variant="bodySm" fontWeight="medium">Available Variables</Text>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: showVariables ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Variable List - Collapsible */}
      {showVariables && (
        <div style={{ 
          padding: '12px 16px',
          backgroundColor: '#ffffff',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4', backgroundColor: '#ffffff' }}>
            {WHATSAPP_VARIABLES.map((item, index) => (
              <div
                key={item.variable}
                style={{
                  marginBottom: index === WHATSAPP_VARIABLES.length - 1 ? '0' : '8px'
                }}
              >
                <div style={{
                  position: 'relative',
                  display: 'inline-block'
                }}
                onMouseEnter={() => setHoveredVariable(item.variable)}
                onMouseLeave={() => setHoveredVariable(null)}
                >
                  <code style={{
                    cursor: 'help',
                    padding: '2px 2px 4px 2px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '3px',
                    border: '1px solid #e5e7eb',
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                    fontSize: '11px',
                    fontWeight: '500'
                  }}>
                    {item.variable}
                  </code>

                  {/* Custom Tooltip */}
                  {hoveredVariable === item.variable && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: '12px',
                      backgroundColor: '#1f2937',
                      color: '#ffffff',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      zIndex: 1000,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      maxWidth: '250px',
                      whiteSpace: 'normal',
                      textAlign: 'center'
                    }}>
                      {item.example}
                      {/* Arrow */}
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '0',
                        height: '0',
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid #1f2937'
                      }} />
                    </div>
                  )}
                </div>
                <span style={{
                  color: '#4b5563',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  paddingLeft: '12px',
                  textIndent: '-12px',
                  display: 'inline'
                }}>
                  : {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
