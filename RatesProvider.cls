public class RatesProvider {

    private static String key = 'hngbwptf6VoSCqAY9B6ziPsDLMP3WzOL';
    // Nunca escribir credenciales directamente en el código, en este caso está hecho con el objetivo de simplificar el ejercicio
    // Si bien no hay problema en que los estudiantes usen esta clave de prueba, mi recomendación es crear tu propia clave en fixer.io, la cuenta gratuita permite 100 llamadas mensuales.


    public static Decimal getLatestRate(String sellCurrency, String buyCurrency) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.apilayer.com/fixer/latest?base=' + sellCurrency + '&symbols=' + buyCurrency);
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json;charset=UTF-8');
        req.setHeader('apikey', key);

        Http http = new Http();
        HttpResponse response = http.send(req);

        if(response.getStatusCode() == 200) {
            Map<String, Object> resultMap  = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> ratesMap   = (Map<String, Object>) resultMap.get('rates');
            return ((Decimal) ratesMap.get(buyCurrency)).setScale(2);
        }
        return null;
    }
}