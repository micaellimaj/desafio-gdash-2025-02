import time
from typing import List, Dict, Optional
from datetime import datetime, timedelta

class WeatherCache:
    def __init__(self, max_size: int = 100, ttl_hours: int = 24):
        self._cache: List[Dict] = []
        self.max_size = max_size
        self.ttl = timedelta(hours=ttl_hours)
    
    def add_weather_log(self, log: Dict):
        """Adiciona log com timestamp automático se não existir."""
        if 'timestamp' not in log:
            log['timestamp'] = datetime.now().isoformat()
        
        self._cache.append(log)
        
        self._cleanup_old_logs()
        
        if len(self._cache) > self.max_size:
            self._cache = self._cache[-self.max_size:]
    
    def _cleanup_old_logs(self):
        """Remove logs mais antigos que o TTL."""
        cutoff_time = datetime.now() - self.ttl
        self._cache = [
            log for log in self._cache 
            if datetime.fromisoformat(log.get('timestamp', '')) > cutoff_time
        ]
    
    def get_weather_logs(self, limit: Optional[int] = None) -> List[Dict]:
        """Retorna logs, opcionalmente limitado."""
        if limit:
            return self._cache[-limit:]
        return self._cache.copy()
    
    def get_latest_for_city(self, city: str) -> Optional[Dict]:
        """Retorna o registro mais recente para uma cidade específica."""
        city_logs = [
            log for log in self._cache 
            if log.get('city', '').lower() == city.lower()
        ]
        return city_logs[-1] if city_logs else None

weather_cache = WeatherCache(max_size=100, ttl_hours=24)

def add_weather_log(log: Dict):
    weather_cache.add_weather_log(log)
    
def get_weather_logs(limit: Optional[int] = None) -> List[Dict]:
    return weather_cache.get_weather_logs(limit)

def get_latest_for_city(city: str) -> Optional[Dict]:
    return weather_cache.get_latest_for_city(city)