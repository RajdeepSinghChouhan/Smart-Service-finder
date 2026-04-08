package model;

public class ServiceRequest 
{
	private String name;
    private String service_type;
    private String location;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getService_type() {
		return service_type;
	}
	public void setService_type(String service_type) {
		this.service_type = service_type;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	@Override
	public String toString() {
		return "ServiceRequest [name=" + name + ", service_type=" + service_type + ", location=" + location + "]";
	}
	
}
