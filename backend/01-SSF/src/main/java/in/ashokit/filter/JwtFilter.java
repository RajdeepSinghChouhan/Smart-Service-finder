package in.ashokit.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import in.ashokit.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{

	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsService userDetailsServive;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException 
	{	
		try 
		{			
			String authorizationHeader = request.getHeader("Authorization");
			String username = null;
			String jwtToken = null;
			
			if(authorizationHeader!=null &&  authorizationHeader.startsWith("Bearer "))
			{
				jwtToken = authorizationHeader.substring(7);//Bearer_ (space also) then we got jwt token(string)
				username = jwtUtil.extractUsername(jwtToken);//method in our jwtUtil class
			}
			if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
			{
				UserDetails userDetails  = this.userDetailsServive.loadUserByUsername(username);
				if(jwtUtil.validateToken(jwtToken))
				{
					//set Authentication context
					SecurityContextHolder.getContext().setAuthentication(
							new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities()));
					
				}
			}
			filterChain.doFilter(request,response);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}

	
	
}
