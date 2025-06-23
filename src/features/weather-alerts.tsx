import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectWeatherForecast } from './weather-data/weather-data-slice';
import Moment from 'moment';

export function WeatherAlerts() {
    const [showAlerts, setShowAlerts] = useState(false);
    const weather: any = useAppSelector(selectWeatherForecast);

    const getAlertIcon = (alertCount: number) => {
        if (alertCount === 1) return '⚠️';
        if (alertCount === 2) return '🚨';
        if (alertCount >= 3) return '🔴';
        return '⚠️'; // fallback
    };

    const toggleAlerts = () => {
        setShowAlerts(!showAlerts);
    };

    const openAlertLink = (alert: any) => {
        // If the alert has tags with links, open them
        if (alert.tags && alert.tags.length > 0) {
            alert.tags.forEach((tag: string) => {
                if (tag.startsWith('http')) {
                    window.open(tag, '_blank');
                }
            });
        }
        // Fallback: create a search URL for the alert event
        else {
            const searchQuery = encodeURIComponent(`${alert.event} weather alert ${alert.sender_name}`);
            const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
            window.open(searchUrl, '_blank');
        }
    };

    if (!weather || !weather.alerts || weather.alerts.length === 0) {
        return (
            <div style={{ 
                padding: '20px', 
                textAlign: 'center',
                backgroundColor: '#f0f8ff',
                borderRadius: '8px',
                margin: '10px 0'
            }}>
                <button 
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'not-allowed',
                        fontSize: '16px',
                        opacity: 0.7
                    }}
                    disabled
                >
                    <span style={{ marginRight: '8px' }}>✅</span>
                    No Weather Alerts
                </button>
            </div>
        );
    }

    return (
        <div style={{ 
            padding: '20px', 
            backgroundColor: '#fff3cd',
            borderRadius: '8px',
            margin: '10px 0',
            border: '1px solid #ffeaa7',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: '-10px',
                left: '20px',
                backgroundColor: '#dc3545',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
                🚨
            </div>
            <button 
                onClick={toggleAlerts}
                style={{
                    padding: '12px 20px',
                    backgroundColor: showAlerts ? '#dc3545' : '#fd7e14',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{getAlertIcon(weather.alerts.length)}</span>
                    <span>{weather.alerts.length} Weather Alert{weather.alerts.length > 1 ? 's' : ''}</span>
                </div>
                <span style={{ fontSize: '12px' }}>{showAlerts ? '▼' : '▶'}</span>
            </button>

            {showAlerts && (
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ 
                        color: '#721c24', 
                        marginBottom: '15px',
                        borderBottom: '2px solid #f5c6cb',
                        paddingBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>⚠️</span> Active Weather Alerts
                    </h3>
                    {weather.alerts.map((alert: any, index: number) => (
                        <div 
                            key={index}
                            style={{
                                backgroundColor: '#f8d7da',
                                border: '1px solid #f5c6cb',
                                borderRadius: '6px',
                                padding: '15px',
                                marginBottom: '15px'
                            }}
                        >
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'flex-start',
                                marginBottom: '10px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '20px' }}>{getAlertIcon(weather.alerts.length)}</span>
                                    <h4 style={{ margin: 0, color: '#721c24' }}>{alert.event}</h4>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ 
                                        fontSize: '12px', 
                                        color: '#6c757d',
                                        fontStyle: 'italic'
                                    }}>
                                        {alert.sender_name}
                                    </span>
                                    <button 
                                        onClick={() => openAlertLink(alert)}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                        title="View more information about this alert"
                                    >
                                        🔗 More Info
                                    </button>
                                </div>
                            </div>
                            
                            <div style={{ 
                                display: 'flex', 
                                gap: '20px', 
                                marginBottom: '10px',
                                fontSize: '14px',
                                color: '#495057'
                            }}>
                                <div>
                                    <strong>Start:</strong> {Moment(new Date(alert.start * 1000)).format('DD/MM/YYYY HH:mm')}
                                </div>
                                <div>
                                    <strong>End:</strong> {Moment(new Date(alert.end * 1000)).format('DD/MM/YYYY HH:mm')}
                                </div>
                            </div>
                            
                            <div style={{ 
                                backgroundColor: '#ffffff',
                                padding: '10px',
                                borderRadius: '4px',
                                fontSize: '14px',
                                lineHeight: '1.4',
                                color: '#495057'
                            }}>
                                {alert.description}
                            </div>
                            
                            {alert.tags && alert.tags.length > 0 && (
                                <div style={{ marginTop: '10px' }}>
                                    <strong style={{ fontSize: '12px', color: '#6c757d' }}>Tags:</strong>
                                    <div style={{ 
                                        display: 'flex', 
                                        flexWrap: 'wrap', 
                                        gap: '5px', 
                                        marginTop: '5px' 
                                    }}>
                                        {alert.tags.map((tag: string, tagIndex: number) => (
                                            <span 
                                                key={tagIndex} 
                                                style={{
                                                    backgroundColor: '#e9ecef',
                                                    padding: '2px 6px',
                                                    borderRadius: '3px',
                                                    fontSize: '11px',
                                                    color: '#495057'
                                                }}
                                            >
                                                {tag.startsWith('http') ? (
                                                    <a 
                                                        href={tag} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        style={{ color: '#007bff', textDecoration: 'none' }}
                                                    >
                                                        {tag}
                                                    </a>
                                                ) : (
                                                    tag
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}