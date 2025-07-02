import React, { useState } from 'react';
import './weather-alerts.css';
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
    };function greet(): void {
    console.log("Hello, World!");
}

greet();

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
            <div className="alert-container">
                <button className="alert-button"
                    disabled
                >
                    <span style={{ marginRight: '8px' }}>✅</span>
                    No Weather Alerts
                </button>
            </div>
        );
    }

    return (
        <div className="alert-wrapper">
            <div className="alert-icon">
                🚨
            </div>
            <button 
                onClick={toggleAlerts}
                className="toggle-button"
            >
                <div className="alert-item-title">
                    <span>{getAlertIcon(weather.alerts.length)}</span>
                    <span>{weather.alerts.length} Weather Alert{weather.alerts.length > 1 ? 's' : ''}</span>
                </div>
                <span>{showAlerts ? '▼' : '▶'}</span>
            </button>

            {showAlerts && (
                <div>
                    <h3 className="alert-header">
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
                                <div className="alert-item-title">
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
                                        className="more-info-button"
                                        title="View more information about this alert"
                                    >
                                        🔗 More Info
                                    </button>
                                </div>
                            </div>
                            
                            <div className="alert-item-details">
                                <div>
                                    <strong>Start:</strong> {Moment(new Date(alert.start * 1000)).format('DD/MM/YYYY HH:mm')}
                                </div>
                                <div>
                                    <strong>End:</strong> {Moment(new Date(alert.end * 1000)).format('DD/MM/YYYY HH:mm')}
                                </div>
                            </div>
                            
                            <div className="alert-item-description">
                                {alert.description}
                            </div>
                            
                            {alert.tags && alert.tags.length > 0 && (
                                <div className="alert-tags">
                                    <strong>Tags:</strong>
                                    <div className="alert-tags-container">
                                        {alert.tags.map((tag: string, tagIndex: number) => (
                                            <span key={tagIndex} className="alert-tag">
                                                {tag.startsWith('http') ? (
                                                    <a 
                                                        href={tag} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
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