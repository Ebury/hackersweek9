public class RatesProvider {

    private static String key = 'your key'; // never hardcode credentials directly in your code

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