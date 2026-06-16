package in.ashokit.util;

import java.security.Key;
import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    
	private static final String SECRET_KEY = "zqPVYdF8Mq3wcshocJaLZV6EkDkEPJ18NhJ/7IHb34U=";
	private static final long EXCPIRATION_TIME = 550000;//2 minute 
	private static final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes()) ;

    
    //create Token
	public String generateToken(String username)
	{
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+EXCPIRATION_TIME))
				.signWith(key,SignatureAlgorithm.HS256)
				.compact();
	}
	
	
	//validate Token
	public boolean validateToken(String token)
	{
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);	
			return true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return false;
	}
	
	//extract user name from token
	public String extractUsername(String token)
	{
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
				.getBody()
				.getSubject();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}
}
